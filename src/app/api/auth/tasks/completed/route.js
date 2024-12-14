import pool from '../../../../database'; 
import jwt from 'jsonwebtoken';

export async function PUT(req) {
  try {
    const token = req.cookies.get('token')?.value;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const  status = "completed";

    const formData = await req.formData();
    const task_id = formData.get('task_id');

    const [rows] = await pool.query(
      'UPDATE tasks SET status = ? WHERE id = ? AND user_id = ?',
      [status, task_id, userId]
    );

    if (rows.affectedRows === 0) {
      return new Response(JSON.stringify({}), { status: 404 });
    }

    return new Response(null, { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'cant update' }), { status: 500 });
  }
}
