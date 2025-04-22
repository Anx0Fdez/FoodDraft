// import { supabaseClient } from "./supabaseClient";
// 
// export const getPost = async ({ userId, token }: { userId: string; token: string }) => {
//   const supabase = await supabaseClient(token);
//   const { data: post } = await supabase
//     .from("post")
//     .select("*")
//     .eq("PostUserID", userId);
//   return post;
// };

import { supabaseClient } from "./supabaseClient";

export const getPost = async ({ userId, token }: { userId: string; token: string }) => {
  const supabase = await supabaseClient(token);

  if (supabase) {
    const { data: post } = await supabase
      .from("post")
      .select("*")
      .eq("PostUserID", userId);
    return post;
  } else {
    console.error("Error al inicializar el cliente de Supabase.");
    return null; // O lanza un error, dependiendo de cómo quieras manejar el fallo
  }
};