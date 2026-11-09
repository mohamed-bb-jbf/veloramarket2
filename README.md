# Velora Market

Marketplace beauté algérienne : boutiques de cosmétiques, acheteuses, et réservation dans les salons de coiffure et de beauté.
Site en français et en arabe (`/fr`, `/ar`), paiement à la livraison, prix en dinars.

## Avancement

| Phase | Contenu | État |
| --- | --- | --- |
| 1 | Accueil, catégories, produits, boutiques, recherche, panier, commande, salons et réservation (données de démonstration) | ✅ |
| 2 | Comptes (acheteuse, vendeuse, salon) avec Supabase Auth | ⏳ |
| 3 | Espace vendeuse : produits, photos, commandes | ⏳ |
| 4 | Espace salon : prestations, horaires, rendez-vous | ⏳ |
| 5 | Administration, commissions, mise en ligne et Google Search Console | ⏳ |

Le schéma de base de données des phases suivantes est prêt dans `supabase/schema.sql`.

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
