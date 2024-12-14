'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


export default function SignupPage() {
  //constucting and sending collecting formdata...
  const [formData, setFormData] = useState({ name: '', username: '', password: '' });
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

   
      if (response.ok) {
//added alert to add interactivity sunce nextjs runs so smooth, we need some engagement.
            alert('signup successful, you can now log in.');
            router.push('/login');

      } else {
        const data = await response.json();
        setMessage(data.error);
      }
    } catch (error) {
      const data = await response.json();
      setMessage(data.error);
    }
  };

  return (

    <div id='wrapboth' className='relative min-h-screen flex flex-col items-center justify-center'>



<h1 className='text-black font-[1000] font-helv mb-5 text-titlexl z-40 px-2 py-1 inline-block underline decoration-pink-300 decoration-4'>Signup</h1>


    <div>
    

      <form className="max-w-sm mx-auto" onSubmit={handleSignup}>

      <div className="mb-5">
      <input className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5 outline-none'
          type="text"
          placeholder="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        </div>

        
        <div className="mb-5">
        <input className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5 outline-none'
          type="username"
          placeholder="username"
          value={formData.username}
          onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          required
        />
        </div>

        <div className="mb-5">
        <input className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5 outline-none'
          type="password"
          placeholder="password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          required
        />
          </div>
          
        <button type="submit" className='mb-2 block text-white bg-[rgba(37,37,37,1)] hover:opacity-70  font-medium rounded-lg w-full px-5 py-2.5 text-center lowercase'>signup</button>
      </form>
      {message && 
      <p className='text-center'>{message}</p>
      }
    </div>

    <div className='underline relative mt-5'>
      <Link href="/login" className="font-bold text-black">
              back to login
            </Link>
            </div>

    </div>
  );
}
