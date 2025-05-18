import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export async function GET() {
  try {
    const { rows } = await pool.query('SELECT * FROM post');
    return NextResponse.json(rows);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching posts', details: error }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, description, dueDate, duration, tasks, ingredients } = body;
    const { rows } = await pool.query(
      'INSERT INTO post (title, description, due_date, duration, tasks, ingredients) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [title, description, dueDate, duration, JSON.stringify(tasks), ingredients]
    );
    return NextResponse.json(rows[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Error creating post', details: error }, { status: 500 });
  }
}
