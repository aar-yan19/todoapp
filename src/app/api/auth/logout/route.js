export async function POST(req) {
  const headers = new Headers();
  headers.append('Set-Cookie', 'token=; HttpOnly; Path=/; Max-Age=0; SameSite=Strict');
  return new Response(
    JSON.stringify({}),
    {status: 200,headers: headers,}
  );
}

//basic logout structure