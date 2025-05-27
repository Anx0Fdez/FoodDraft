"use client";

import { useEffect, useState } from "react";
import { FoodDictionary } from "./FoodDictionary";

export default function RecetarioPage() {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Obtener recetas random al cargar la página
  useEffect(() => {
    const fetchRandom = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`/api/spoonacular?random=true&number=39`);
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

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      // Buscar en español y en inglés
      const queries = [query, query && query !== '' ? await translateToEnglish(query) : ''].filter(Boolean);
      let allResults: any[] = [];
      for (const q of queries) {
        const res = await fetch(`/api/spoonacular?query=${encodeURIComponent(q)}&number=39`);
        const data = await res.json();
        if (data.results) allResults = allResults.concat(data.results);
      }
      // Eliminar duplicados por id
      const uniqueResults = Array.from(new Map(allResults.map(r => [r.id, r])).values());
      if (uniqueResults.length > 0) setRecipes(uniqueResults);
      else setError("No se encontraron recetas");
    } catch (err) {
      setError("Error buscando recetas");
    } finally {
      setLoading(false);
    }
  };

  // Traducción básica español-inglés (solo para términos simples)
  async function translateToEnglish(text: string): Promise<string> {
    return FoodDictionary[text.trim().toLowerCase()] || text;
  }

  return (
    <div className="flex flex-col items-center gap-8 p-8">
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
      {error && <div className="text-red-600 font-semibold">{error}</div>}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-3 gap-x-10 gap-y-10 w-full max-w-7xl">
        {recipes.map(recipe => (
          <div
            key={recipe.id}
            className="bg-orange-50 border border-orange-200 rounded-2xl shadow-md p-6 flex flex-col items-center hover:shadow-xl transition-all duration-200 group w-full max-w-[340px] min-h-[340px]"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-xl mb-4 border border-orange-100 group-hover:scale-105 transition-transform duration-200"
              style={{ background: 'linear-gradient(135deg, #ffe385 0%, #ffcd46 100%)' }}
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
