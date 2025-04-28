import { createClient } from "@supabase/supabase-js";

export const supabaseClient = async (supabaseToken: string) => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Las variables de entorno de Supabase no están definidas.");
    return null;
  }

  // Agregado un registro detallado para depurar problemas de conexión
  console.log('Inicializando Supabase con URL:', supabaseUrl);
  console.log('Clave anónima:', supabaseAnonKey ? 'Cargada correctamente' : 'No cargada');

  const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
    }
  );

  supabase.from('post').select('*').then(({ data, error }) => {
    if (error) {
      console.error('Error al probar la conexión con Supabase:', error.message, error.details, error.hint);
    } else {
      console.log('Conexión exitosa. Datos de prueba:', data);
    }
  });

  return supabase;
};

// import { createClient } from "@supabase/supabase-js";
// 
// export const supabaseClient = async (supabaseToken: string) => {
//   const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
//   const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
// 
//   if (!supabaseUrl || !supabaseAnonKey) {
//     console.error("Las variables de entorno de Supabase no están definidas.");
//     return null;
//   }
// 
//   const supabase = createClient(
//     supabaseUrl,
//     supabaseAnonKey,
//     {
//       global: { headers: { Authorization: `Bearer ${supabaseToken}` } },
//     }
//   );
// 
//   return supabase;
// };