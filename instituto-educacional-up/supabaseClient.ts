import { createClient } from '@supabase/supabase-js';

// NOTA: Quando for para o Vercel, usaremos variáveis de ambiente.
// Por enquanto, o código tentará ler do ambiente, se não achar, avisa no console.

// Casting import.meta to any to bypass missing type definition for env
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL;
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('Supabase URL ou Key não encontradas. O site funcionará apenas em modo leitura/local.');
}

export const supabase = createClient(supabaseUrl || '', supabaseKey || '');