import pool from '../../../database';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {

    //constructig token to fetch user id from it to validatie the session authentication...
    const token = req.cookies.get('token')?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const formData = await req.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    
    if (!title || !description) {
      return new Response(
        JSON.stringify({ error: 'form data required' }),
        { status: 400 }
      );
    }

    const projectResult = await pool.query(
      'INSERT INTO tasks (user_id, title, description) VALUES (?, ?, ?)',
      [userId, title, description]
    );
    

    return new Response(null, { status: 200 });
    
 } catch (error) {
  return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
}
}
