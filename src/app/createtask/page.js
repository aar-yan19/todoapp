'use client';


import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Loading from './loading';
import Link from 'next/link';


export default function CreateProject() {

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    //to fetch user data to add dynamic user data...
    const fetchUser = async () => {
      try {
        const response = await fetch('/api/users/auth/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('failed to fetch user data');
        }

        const data = await response.json();
        setName(data.name);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchUser();
  }, []); 

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!name) {
    return <Loading /> 
  }

  
  const handleSubmit = async (e) => {
    e.preventDefault();
  

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
  
    const response = await fetch('/api/auth/createtask', {
      method: 'POST',
      body: formData, 
    });
  
  
    if (response.ok) {

      router.push('/');

    } else {
      const data = await response.json();
      setError(data.error);
    }
    
  };
  
  return (

    <div id='wrapboth' className='relative min-h-screen flex flex-col items-center justify-center'>


<div className=' underline z-40 absolute top-0  flex justify-between p-4'>
          <div className="flex gap-4">
            <Link href="/"  className="font-bold text-black">
              tasks
            </Link>
      
          </div>
        </div>


    <div>

     
     <h1 className='mb-5 text-xl z-40 px-2 py-1 text-black font-black inline-block underline decoration-pink-300 decoration-4'>Create New task</h1>
     
     <form  className="max-w-sm mx-auto" onSubmit={handleSubmit}>
        

        <div className="mb-5">
        <label className="block mb-2 text-sm font-medium text-black ">Title</label>
        <input className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5 outline-none'
            type="text"
            placeholder="&quot;watch interstellar&quot;"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
    
      

        <div className="mb-5">

        <label className="block mb-2 text-sm font-medium text-black ">Description</label>

          <textarea className='bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:border-black block w-full p-2.5 outline-none'
            value={description}
            placeholder="&quot;once in a life imax opportunity&quot;"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>


      

        
        
        {error && <p>{error}</p>}
        <button type="submit"  className='mb-2 block text-white bg-[rgba(37,37,37,1)] hover:opacity-70  font-medium rounded-lg w-full px-5 py-2.5 text-center lowercase'>Create task</button>
      </form>

    </div>

    </div>


  );
}
