import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    await pool.query('DELETE FROM post WHERE id = $1', [id]);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Error deleting post', details: error }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const id = params.id;
    const { title, description, duration, ingredients } = await req.json();
    const { rows } = await pool.query(
      'UPDATE post SET title = $1, description = $2, duration = $3, ingredients = $4 WHERE id = $5 RETURNING *',
      [title, description, duration, ingredients, id]
    );
    return NextResponse.json(rows[0], { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Error actualizando post', details: error }, { status: 500 });
  }
}
