import { NextRequest, NextResponse } from 'next/server';

// Endpoint para consultar recetas a la API de Spoonacular
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const random = searchParams.get('random');
  const number = searchParams.get('number') || '12';
  const apiKey = process.env.SPOONACULAR_API_KEY;
  // Verifica que exista la API KEY
  if (!apiKey) {
    return NextResponse.json({ error: 'No hay API KEY de Spoonacular configurada' }, { status: 500 });
  }
  try {
    let url = '';
    // Si se solicita recetas aleatorias
    if (random === 'true') {
      url = `https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${apiKey}`;
    } else {
      // Si se busca por texto
      url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=${number}&apiKey=${apiKey}`;
    }
    // Realiza la petición a la API externa
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: 'Error consultando Spoonacular (Superada las peticiones diarias)' }, { status: 500 });
    }
    const data = await res.json();
    // Unifica el formato de resultados para aleatorio
    if (random === 'true') {
      return NextResponse.json({ results: data.recipes });
    }
    // Devuelve el resultado estándar
    return NextResponse.json(data);
  } catch (err) {
    // Error de red o petición
    return NextResponse.json({ error: 'Error de red con Spoonacular' }, { status: 500 });
  }
}
