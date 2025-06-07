import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get('query') || '';
  const random = searchParams.get('random');
  const number = searchParams.get('number') || '12';
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: 'No hay API KEY de Spoonacular configurada' }, { status: 500 });
  }
  try {
    let url = '';
    if (random === 'true') {
      url = `https://api.spoonacular.com/recipes/random?number=${number}&apiKey=${apiKey}`;
    } else {
      url = `https://api.spoonacular.com/recipes/complexSearch?query=${encodeURIComponent(query)}&number=${number}&apiKey=${apiKey}`;
    }
    const res = await fetch(url);
    if (!res.ok) {
      return NextResponse.json({ error: 'Error consultando Spoonacular (Superada las peticiones diarias)' }, { status: 500 });
    }
    const data = await res.json();
    // Unificar el formato de resultados
    if (random === 'true') {
      return NextResponse.json({ results: data.recipes });
    }
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: 'Error de red con Spoonacular' }, { status: 500 });
  }
}
