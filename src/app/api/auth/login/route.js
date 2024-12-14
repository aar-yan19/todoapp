//header imports , pool is connection to mysql2
import bcrypt from 'bcrypt';
import pool from '../../../database';
import jwt from 'jsonwebtoken';

export async function POST(req) {
  try {

    const { username, password } = await req.json();

    //to fetch user details for login;
    const [rows] = await pool.query('SELECT * FROM Users WHERE username = ?', [username]);


    if (rows.length === 0) {
      return new Response(JSON.stringify({ error: 'invalid username' }), { status: 401 });
    }

    const user = rows[0];

    //checking encrypted password with bycrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return new Response(JSON.stringify({ error: 'invalid password' }), { status: 401 });
    }

    //constructing jwt token for authentication in api endponts. a jwt-secret is defined in .env.local file
    const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    //storing in cookie rather than local storage to prvent basic javascript attacks
    const headers = new Headers();
    headers.append('Set-Cookie', `token=${token}; HttpOnly; Path=/; Max-Age=3600; SameSite=Strict`);

    return new Response(null,
      {status: 200,headers: headers,}
    );

  } catch (error) {
    return new Response(JSON.stringify({ error: 'server error' }), { status: 500 });
  }
}
