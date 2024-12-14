import bcrypt from 'bcrypt';
import pool from '../../../database';


export async function POST(req) {
  try {

    const { name, username, password } = await req.json();

    //check if username exist already in db
    const [existingUser] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);
    if (existingUser.length > 0) {
      return new Response(JSON.stringify({ error: 'user already exists' }), { status: 400 });
    }

    //encrypting the password with bycrypt-
    const hashedPassword = await bcrypt.hash(password, 10);

    await pool.query('INSERT INTO Users (id, name, username, password) VALUES (UUID(), ?, ?, ?)', [
      name,
      username,
      hashedPassword,
    ]);

    return new Response(null, { status: 201 });

  } catch (error) {
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}