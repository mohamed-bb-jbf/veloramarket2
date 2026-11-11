/**
 * Connexion à Supabase côté serveur.
 * Tant que SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY ne sont pas définies dans Vercel,
 * le site fonctionne en mode démonstration : rien n'est enregistré.
 */
export const SUPABASE_URL = process.env.SUPABASE_URL?.replace(/\/$/, "");
export const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const backendReady = Boolean(SUPABASE_URL && SUPABASE_KEY);
