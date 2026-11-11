/**
 * Adresse publique du site.
 * Priorité : NEXT_PUBLIC_SITE_URL (votre domaine) → domaine de production Vercel → localhost.
 */
const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || (vercel ? `https://${vercel}` : "http://localhost:3000")
).replace(/\/$/, "");

export const SITE_NAME = "Velora Market";
