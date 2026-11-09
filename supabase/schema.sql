-- Velora Market : schéma de base de données (Supabase / PostgreSQL)
-- Phase 2+ : à exécuter dans Supabase > SQL Editor.

create type user_role as enum ('buyer', 'seller', 'salon', 'admin');
create type order_status as enum ('new', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned');
create type booking_status as enum ('pending', 'accepted', 'refused', 'done', 'no_show', 'cancelled');
create type salon_type as enum ('women', 'men', 'mixed');

-- Profils (1 par compte Supabase Auth)
create table profiles (
  id uuid primary key references auth.users on delete cascade,
  role user_role not null default 'buyer',
  full_name text,
  phone text,
  wilaya smallint check (wilaya between 1 and 58),
  created_at timestamptz not null default now()
);

-- Boutiques des vendeuses
create table shops (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles on delete cascade,
  slug text unique not null,
  name text not null,
  bio_fr text, bio_ar text,
  wilaya smallint not null check (wilaya between 1 and 58),
  city text,
  logo_url text,
  verified boolean not null default false,
  approved boolean not null default false,          -- validé par l'admin
  commission_rate numeric(5,2) not null default 10, -- % prélevé par Velora
  created_at timestamptz not null default now()
);

create table categories (
  slug text primary key,
  name_fr text not null,
  name_ar text not null,
  position smallint not null default 0
);

create table products (
  id uuid primary key default gen_random_uuid(),
  shop_id uuid not null references shops on delete cascade,
  category text not null references categories,
  name text not null,
  brand text,
  desc_fr text, desc_ar text,
  price integer not null check (price > 0),          -- en dinars
  old_price integer,
  stock integer not null default 0 check (stock >= 0),
  images text[] not null default '{}',
  shades jsonb not null default '[]',                -- [{name, hex}]
  active boolean not null default true,
  created_at timestamptz not null default now()
);
create index on products (category) where active;
create index on products (shop_id);

-- Commandes : une commande par boutique (chaque boutique livre elle-même)
create table orders (
  id uuid primary key default gen_random_uuid(),
  number text unique not null,
  buyer_id uuid references profiles on delete set null,
  shop_id uuid not null references shops,
  status order_status not null default 'new',
  customer_name text not null,
  phone text not null,
  wilaya smallint not null check (wilaya between 1 and 58),
  commune text not null,
  address text not null,
  note text,
  subtotal integer not null,
  delivery_fee integer not null default 0,
  commission integer not null default 0,             -- calculée à la livraison
  created_at timestamptz not null default now()
);

create table order_items (
  id bigint generated always as identity primary key,
  order_id uuid not null references orders on delete cascade,
  product_id uuid references products on delete set null,
  name text not null,
  shade text,
  unit_price integer not null,
  qty integer not null check (qty > 0)
);

-- Salons
create table salons (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references profiles on delete cascade,
  slug text unique not null,
  name text not null,
  type salon_type not null,
  bio_fr text, bio_ar text,
  wilaya smallint not null check (wilaya between 1 and 58),
  address text,
  photos text[] not null default '{}',
  hours jsonb not null default '[]',                 -- 7 éléments, dimanche = 0 : ["09:00","18:00"] ou null
  approved boolean not null default false,
  commission_rate numeric(5,2) not null default 10,
  created_at timestamptz not null default now()
);

create table salon_services (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references salons on delete cascade,
  name_fr text not null, name_ar text not null,
  price integer not null,
  minutes smallint not null check (minutes > 0)
);

create table bookings (
  id uuid primary key default gen_random_uuid(),
  salon_id uuid not null references salons on delete cascade,
  service_id uuid not null references salon_services,
  client_id uuid references profiles on delete set null,
  client_name text not null,
  phone text not null,
  starts_at timestamptz not null,
  ends_at timestamptz not null,
  status booking_status not null default 'pending',
  price integer not null,
  created_at timestamptz not null default now()
);
create index on bookings (salon_id, starts_at);

create table reviews (
  id bigint generated always as identity primary key,
  author_id uuid not null references profiles on delete cascade,
  product_id uuid references products on delete cascade,
  salon_id uuid references salons on delete cascade,
  rating smallint not null check (rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now(),
  check ((product_id is null) <> (salon_id is null))
);

create table favorites (
  user_id uuid references profiles on delete cascade,
  product_id uuid references products on delete cascade,
  primary key (user_id, product_id)
);

-- ===== Sécurité (Row Level Security) =====
alter table profiles enable row level security;
alter table shops enable row level security;
alter table products enable row level security;
alter table orders enable row level security;
alter table order_items enable row level security;
alter table salons enable row level security;
alter table salon_services enable row level security;
alter table bookings enable row level security;
alter table reviews enable row level security;
alter table favorites enable row level security;
alter table categories enable row level security;

create function is_admin() returns boolean language sql stable security definer as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin')
$$;

create policy "profil: lecture/écriture par soi" on profiles for all using (id = auth.uid() or is_admin());

create policy "catégories: lecture publique" on categories for select using (true);

create policy "boutiques: lecture publique si validée" on shops for select using (approved or owner_id = auth.uid() or is_admin());
create policy "boutiques: gérées par la propriétaire" on shops for all using (owner_id = auth.uid() or is_admin());

create policy "produits: lecture publique" on products for select
  using (active and exists (select 1 from shops s where s.id = shop_id and s.approved)
         or exists (select 1 from shops s where s.id = shop_id and s.owner_id = auth.uid()) or is_admin());
create policy "produits: gérés par la boutique" on products for all
  using (exists (select 1 from shops s where s.id = shop_id and s.owner_id = auth.uid()) or is_admin());

-- Les commandes sont créées par une fonction serveur (service role), pas directement par le navigateur.
create policy "commandes: visibles par l'acheteuse et la boutique" on orders for select
  using (buyer_id = auth.uid() or exists (select 1 from shops s where s.id = shop_id and s.owner_id = auth.uid()) or is_admin());
create policy "commandes: statut modifié par la boutique" on orders for update
  using (exists (select 1 from shops s where s.id = shop_id and s.owner_id = auth.uid()) or is_admin());
create policy "lignes: visibles avec la commande" on order_items for select
  using (exists (select 1 from orders o where o.id = order_id));

create policy "salons: lecture publique si validé" on salons for select using (approved or owner_id = auth.uid() or is_admin());
create policy "salons: gérés par le propriétaire" on salons for all using (owner_id = auth.uid() or is_admin());
create policy "prestations: lecture publique" on salon_services for select using (true);
create policy "prestations: gérées par le salon" on salon_services for all
  using (exists (select 1 from salons s where s.id = salon_id and s.owner_id = auth.uid()) or is_admin());

create policy "rdv: visibles par la cliente et le salon" on bookings for select
  using (client_id = auth.uid() or exists (select 1 from salons s where s.id = salon_id and s.owner_id = auth.uid()) or is_admin());
create policy "rdv: statut modifié par le salon" on bookings for update
  using (exists (select 1 from salons s where s.id = salon_id and s.owner_id = auth.uid()) or is_admin());

create policy "avis: lecture publique" on reviews for select using (true);
create policy "avis: écrits par leur autrice" on reviews for insert with check (author_id = auth.uid());

create policy "favoris: privés" on favorites for all using (user_id = auth.uid());

insert into categories (slug, name_fr, name_ar, position) values
  ('maquillage', 'Maquillage', 'مكياج', 1),
  ('soins-visage', 'Soins de la peau', 'العناية بالبشرة', 2),
  ('cheveux', 'Cheveux', 'الشعر', 3),
  ('parfums', 'Parfums', 'عطور', 4),
  ('soins-corps', 'Soins du corps', 'العناية بالجسم', 5),
  ('ongles', 'Ongles', 'الأظافر', 6);
