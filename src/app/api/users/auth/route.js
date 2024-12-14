import pool from '../../../database';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    //getting user data - name and username based on id. jwt authentication in work.
    const [rows] = await pool.query('SELECT name, username FROM Users WHERE id = ?', [userId]);

    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'user not found' }), { status: 404 });
    }

    return new Response(JSON.stringify(rows[0]), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'failed' }), { status: 500 });
  }
}
