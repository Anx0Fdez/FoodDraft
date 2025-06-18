// Este componente permite buscar recetas usando la API de Spoonacular y muestra los resultados.
import { useEffect, useState } from "react";
import { FoodDictionary } from "./FoodDictionary";

export default function RecipesApi() {
  // Estado para la consulta de búsqueda
  const [query, setQuery] = useState("");
  // Estado para las recetas obtenidas
  const [recipes, setRecipes] = useState<any[]>([]);
  // Estado para mostrar si está cargando
  const [loading, setLoading] = useState(false);
  // Estado para mostrar errores
  const [error, setError] = useState("");

  // Al montar el componente, obtiene recetas aleatorias
  useEffect(() => {
    const fetchRandom = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/spoonacular?random=true&number=40`);
        const data = await res.json();
        if (data.results) setRecipes(data.results);
        else setError(data.error || "No se encontraron recetas");
      } catch (err) {
        setError("Error buscando recetas");
      } finally {
        setLoading(false);
      }
    };
    fetchRandom();
  }, []);

  // Maneja la búsqueda de recetas por nombre (en español o traducido)
  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Traduce la consulta si es necesario
      const queries = [query, query && query !== '' ? await translateToEnglish(query) : ''].filter(Boolean);
      let allResults: any[] = [];
      for (const q of queries) {
        const res = await fetch(`/api/spoonacular?query=${encodeURIComponent(q)}&number=40`);
        const data = await res.json();
        if (data.results) allResults = allResults.concat(data.results);
      }
      // Elimina duplicados por id
      const uniqueResults = Array.from(new Map(allResults.map(r => [r.id, r])).values());
      if (uniqueResults.length > 0) setRecipes(uniqueResults);
      else setError("No se encontraron recetas");
    } catch (err) {
      setError("Error buscando recetas");
    } finally {
      setLoading(false);
    }
  };

  // Traduce el texto a inglés usando el diccionario
  async function translateToEnglish(text: string): Promise<string> {
    return FoodDictionary[text.trim().toLowerCase()] || text;
  }

  return (
    <div className="flex flex-col items-center gap-8 p-8">
      {/* Formulario de búsqueda */}
      <form onSubmit={handleSearch} className="flex gap-3 w-full max-w-xl mb-6">
        <input
          type="text"
          placeholder="Buscar receta por nombre..."
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 border border-orange-300 rounded-lg px-4 py-2 text-base bg-orange-50 text-orange-800 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button
          type="submit"
          className="px-6 py-2 rounded-lg bg-orange-600 text-white font-semibold hover:bg-orange-700 transition-colors"
          disabled={loading}
        >
          {loading ? "Buscando..." : "Buscar"}
        </button>
      </form>
      {/* Mensaje de error si ocurre */}
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      {/* Grid de recetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-12 gap-y-12 w-full max-w-7xl">
        {recipes.map(recipe => (
          <div
            key={recipe.id}
            className="bg-orange-50 border border-orange-200 rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-all duration-200 group w-full max-w-[380px] min-h-[380px]"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-56 object-cover rounded-xl mb-4 border border-orange-100 group-hover:scale-105 transition-transform duration-200 z-0"
              style={{ background: 'linear-gradient(135deg, #fff3c4 0%, #ffe6a7 100%)' }}
            />
            <h3 className="text-xl font-bold text-orange-700 text-center mb-2 group-hover:text-orange-600 transition-colors duration-200">
              {recipe.title}
            </h3>
            <a
              href={`https://spoonacular.com/recipes/${recipe.title.replace(/\s+/g, "-").toLowerCase()}-${recipe.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-yellow-500 hover:text-orange-400 font-semibold text-base mt-auto transition-colors duration-200"
            >
              Ver en Spoonacular
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
