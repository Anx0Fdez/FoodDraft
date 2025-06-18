import { NextRequest, NextResponse } from 'next/server';
import { Pool } from 'pg';

// Configuración de la conexión a la base de datos PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// Maneja los eventos enviados por Clerk a través del webhook
export async function POST(req: NextRequest) {
  try {
    // Extrae el evento recibido en el webhook
    const event = await req.json();
    // Si se crea un usuario, lo inserta en la base de datos
    if (event.type === 'user.created') {
      const user = event.data;
      await pool.query(
        'INSERT INTO users (id, email, created_at, profile_image_url, username) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING',
        [
          user.id,
          user.email_addresses?.[0]?.email_address || null,
          new Date(user.created_at).toISOString(),
          user.profile_image_url || null,
          user.username || null
        ]
      );
    }
    // Si se actualiza un usuario, actualiza sus datos en la base de datos
    if (event.type === 'user.updated') {
      const user = event.data;
      await pool.query(
        'UPDATE users SET email = $2, profile_image_url = $3, username = $4 WHERE id = $1',
        [
          user.id,
          user.email_addresses?.[0]?.email_address || null,
          user.profile_image_url || null,
          user.username || null
        ]
      );
    }
    // Si se elimina un usuario, lo borra de la base de datos
    if (event.type === 'user.deleted') {
      const user = event.data;
      await pool.query('DELETE FROM users WHERE id = $1', [user.id]);
    }
    // Responde con éxito si todo salió bien
    return NextResponse.json({ success: true });
  } catch (error) {
    // Devuelve un error si algo falla en el proceso
    return NextResponse.json({ error: 'Error processing webhook', details: error }, { status: 500 });
  }
}
