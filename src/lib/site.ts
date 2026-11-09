/** Adresse publique du site. À définir dans Vercel : NEXT_PUBLIC_SITE_URL=https://votre-domaine.com */
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");
export const SITE_NAME = "Velora Market";
