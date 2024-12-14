import pool from '../../../database';
import jwt from 'jsonwebtoken';

export async function GET(req) {
  try {
    const token = req.cookies.get('token')?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    //fetching tasks based on userid
  const [rows] = await pool.query(
      'SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );


    if (rows.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    return new Response(JSON.stringify(rows), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'failed' }), { status: 500 });
  }
}
