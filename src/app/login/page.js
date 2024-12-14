//using client becaus state management requires client rendering
'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';


export default function LoginPage() {
  //route to app page
  const router = useRouter();
  //state management for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  //to dynamically dislay error messages.
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });

      
      if (response.ok) {
      
        router.push('/');
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      const data = await response.json();
      setError(data.error);
    }
  };

  return (

// i always create a full page container to maintain consistency
    <div id='wrapboth' className='lowercase relative min-h-screen flex flex-col items-center justify-center'>



<h1 className='text-black font-[1000] font-helv mb-5 text-titlexl z-40 px-2 py-1 inline-block underline decoration-pink-300 decoration-4'>Login</h1>



<form className="max-w-sm mx-auto" onSubmit={handleLogin}>

<div className="mb-5">
<input className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5 outline-none'
        type="username"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />

</div>

<div className="mb-5">
<input className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5 outline-none'
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

</div>

      <button type="submit" className='mb-2 block text-white bg-[rgba(37,37,37,1)] hover:opacity-70  font-medium rounded-lg w-full px-5 py-2.5 text-center'>enter</button>

      {error && 
      
      <p className='text-center'>{error}</p>
      
      }

    </form>


    <div className='underline relative mt-5'>
      <Link href="/signup" className="font-bold text-black">
              Create new account
            </Link>
            </div>

    </div>


  );
}
