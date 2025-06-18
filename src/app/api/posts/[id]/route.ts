import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Elimina un post por su ID
export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await pool.query('DELETE FROM post WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting post', details: error }, { status: 500 });
  }
}

// Actualiza un post por su ID, manteniendo los likes/dislikes actuales
export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const { title, description, duration, ingredients } = await req.json();
    // Obtener los likes y dislikes actuales para no sobreescribirlos con null
    const { rows: postRows } = await pool.query('SELECT likes, dislikes FROM post WHERE id = $1', [id]);
    const currentLikes = postRows[0]?.likes ?? 0;
    const currentDislikes = postRows[0]?.dislikes ?? 0;
    const { rows } = await pool.query(
      'UPDATE post SET title = $1, description = $2, duration = $3, ingredients = $4, likes = $5, dislikes = $6 WHERE id = $7 RETURNING *',
      [title, description, duration, ingredients, currentLikes, currentDislikes, id]
    );
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error actualizando post', details: error }, { status: 500 });
  }
}

// Permite votar (like/dislike) un post por parte de un usuario
export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const { userId, vote } = await req.json(); // vote: 1 (like), -1 (dislike)
    if (![1, -1].includes(vote)) {
      return NextResponse.json({ error: 'Voto inválido' }, { status: 400 });
    }
    // Verificar si el usuario ya votó
    const { rows: existing } = await pool.query(
      'SELECT * FROM user_post_vote WHERE user_id = $1 AND post_id = $2',
      [userId, id]
    );
    let likesChange = 0;
    let dislikesChange = 0;
    if (existing.length === 0) {
      // Nuevo voto
      await pool.query(
        'INSERT INTO user_post_vote (user_id, post_id, vote) VALUES ($1, $2, $3)',
        [userId, id, vote]
      );
      if (vote === 1) likesChange = 1;
      else dislikesChange = 1;
    } else if (existing[0].vote !== vote) {
      // Cambia el voto
      await pool.query(
        'UPDATE user_post_vote SET vote = $1 WHERE user_id = $2 AND post_id = $3',
        [vote, userId, id]
      );
      if (vote === 1) { likesChange = 1; dislikesChange = -1; }
      else { likesChange = -1; dislikesChange = 1; }
    } else {
      // Ya votó igual, no hacer nada
      return NextResponse.json({ success: true });
    }
    // Actualizar contadores en post
    await pool.query(
      'UPDATE post SET likes = likes + $1, dislikes = dislikes + $2 WHERE id = $3',
      [likesChange, dislikesChange, id]
    );
    // Devolver el post actualizado
    const { rows } = await pool.query('SELECT * FROM post WHERE id = $1', [id]);
    return NextResponse.json(rows[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Error votando post', details: error }, { status: 500 });
  }
}
