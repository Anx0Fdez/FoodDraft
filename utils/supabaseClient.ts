import { createClient } from "@supabase/supabase-js";

export const supabaseClient = async (supabaseToken: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Las variables de entorno de Supabase no están definidas.");
    // Aquí podrías retornar un error o un cliente Supabase por defecto
    return null;
  }

  const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
    }
  );

  return supabase;
};

// import { createClient } from "@supabase/supabase-js";
// 
// export const supabaseClient = async (supabaseToken: string) => {
//   const supabase = createClient(
//     process.env.NEXT_PUBLIC_SUPABASE_URL,
//     process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
//     {
//       global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
//     }
//   );
// 
//   return supabase;
// };