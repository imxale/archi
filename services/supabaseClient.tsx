import { createClient } from '@supabase/supabase-js';

// Vérification des variables d'environnement
if (!process.env.projectUrl || !process.env.apiKey) {
  throw new Error("Les variables d'environnement Supabase ne sont pas définies !");
}

// Initialisation du client Supabase
export const supabaseAdmin = createClient(
  process.env.projectUrl,
  process.env.apiKey
);
