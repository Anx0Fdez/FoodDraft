import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const { rows } = await pool.query(`
      SELECT post.*, users.profile_image_url, users.username, users.id as user_id
      FROM post
      LEFT JOIN users ON post.user_id = users.id
      ORDER BY (post.likes - post.dislikes) DESC, post.id DESC
    `);
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts', details: error }, { status: 500 });
  }
}

// POST: Crear un nuevo post
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, dueDate, duration, ingredients, userId } = body;
    // Validación básica
    if (!title || !description || !duration || !ingredients || !userId) {
      return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }
    const { rows } = await pool.query(
      'INSERT INTO post (title, description, due_date, duration, ingredients, user_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, dueDate, duration, ingredients, userId]
    );
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creando post', details: error }, { status: 500 });
  }
}
