# Velora Market

Marketplace beauté algérienne : boutiques de cosmétiques, acheteuses, et réservation dans les salons de coiffure et de beauté.
Site en français et en arabe (`/fr`, `/ar`), paiement à la livraison, prix en dinars.

## Avancement

| Étape | Contenu | État |
| --- | --- | --- |
| 1 | Vitrine : accueil, catégories, produits, boutiques, recherche par wilaya, panier, commande, salons et réservation | ✅ |
| 1b | Formulaires d'inscription des boutiques et des salons ; réception des commandes, rendez-vous et inscriptions dans Supabase (table `submissions`) | ✅ (à activer, voir ci-dessous) |
| 2 | Comptes (acheteuse, vendeuse, salon) avec Supabase Auth | ⏳ |
| 3 | Espace vendeuse : produits, photos, commandes | ⏳ |
| 4 | Espace salon : prestations, horaires, rendez-vous | ⏳ |
| 5 | Administration, commissions, Google Search Console | ⏳ |

Les boutiques, produits et salons affichés sont des exemples (photos Unsplash, licence libre).

## Activer la réception des demandes

Sans configuration, le site est en mode démonstration : rien n'est enregistré.

1. Créer un projet sur supabase.com, puis exécuter `supabase/schema.sql` dans **SQL Editor**.
2. Dans Vercel > **Settings → Environment Variables**, ajouter `SUPABASE_URL` et `SUPABASE_SERVICE_ROLE_KEY`
   (Supabase > **Project Settings → API**). Ne jamais mettre ces valeurs dans le code.
3. Redéployer. Les demandes arrivent dans la table `submissions` (Supabase > **Table Editor**).

## Lancer en local

```bash
npm install
npm run dev
```

Puis ouvrir http://localhost:3000.

## Mise en ligne (Vercel)

1. Sur vercel.com, se connecter avec GitHub, puis **Add New → Project** et choisir ce dépôt.
2. Dans **Environment Variables**, ajouter `NEXT_PUBLIC_SITE_URL` = l'adresse du site (ex. `https://veloramarket.com`).
3. **Deploy**.
4. Dans **Settings → Domains**, ajouter votre nom de domaine et suivre les indications DNS.
5. Sur Google Search Console, ajouter le domaine puis envoyer `https://votre-domaine/sitemap.xml`.

## Structure

- `src/app/[lang]/` : pages (fr / ar)
- `src/lib/data.ts` : données de démonstration (remplacées par Supabase en phase 2)
- `src/lib/i18n.ts` : textes français et arabes
- `src/lib/wilayas.ts` : les 58 wilayas
- `supabase/schema.sql` : tables et règles de sécurité
