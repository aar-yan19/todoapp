'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Loading from './loading';

export default function CreateProject() {
  const [name, setName] = useState([]);
  const [tasks, setTasks] = useState([]); 
  const [error, setError] = useState(null);



  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', 
      { method: 'POST' });
      if (response.ok) {
        router.push('/');
      } else {
        console.error('Logout failed:', await response.text());
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };


  useEffect(() => { 
    fetchUserData();
    fetchTaskstData();
  }, []);

  //getting user data...
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/users/auth/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch user data');
        }

        const data = await response.json();
        setName(data); 
      } catch (err) {
        setError(err.message);
      }
    };

    //getting the tasks all of them....
    const fetchTaskstData = async () => {
      try {
        const response = await fetch('/api/tasks/auth/', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch project data');
        }

        const data = await response.json();
       
          setTasks(data);
       
     
      } catch (err) {
        setError(err.message);
      }
    };

   

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!name) {
    return  <Loading />; 
  }

//now here is the updating status . default is set to pending, create a new ptask to check. then we have 
// on click events which pass the task id along with them to backend api to update.
  const handleStatusUpdate = async (task_id, status) => {
    const formData = new FormData();
    formData.append('task_id', task_id);
  
    try {
      const response = await fetch(`/api/auth/tasks/${status}`, {
        method: 'PUT',
        body: formData,
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        console.error('Error message from server:', errorMessage);
        throw new Error('Network response was not ok');
      }
  
      if (response.ok) {
        await fetchTaskstData(); 
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setError('Something went wrong');
    }
  };
  
// here, we have inprogress,completed,pending and delete click events. 

//i could have combined them in , but i wanted different apis because
// i learned that it somehow reduces load to not interpret the pther sql queries...
// so after reseraching various repos and stackoverflow and gpts,
// i found out i can do this combining click event thing like this for my use case
//if you see this, i would appreciae if you explain me what should have been the approach here...

  const handleInprogress = (task_id) => handleStatusUpdate(task_id, 'inprogress');
  const handleCompleted = (task_id) => handleStatusUpdate(task_id, 'completed');
  const handlePending = (task_id) => handleStatusUpdate(task_id, 'pending');
  const handleDeleted = (task_id) => handleStatusUpdate(task_id, 'deleted');
  
  
  

  return (
    <div id='wrapboth' className='relative min-h-screen flex flex-col items-center justify-center'>
      
      


      <div className=' z-40 absolute top-0  flex justify-between p-4'>
          <div className="underline flex gap-4">
            <Link href="#!" onClick={handleLogout} className="font-bold text-black">
              
              Logout
            </Link>
          </div>
        </div>

{/* i love spacers  */}
        <div className="my-8"></div>

        <div className='underline relative'>
      <Link href="/createtask" className="underline font-bold text-black">
              + task
            </Link>
            </div>  

      <div className='relative text-center'>
        <h1 className='underline decoration-pink-300 decoration-4 mb-5 text-titlexl z-40 px-1 py-1  text-black font-black inline-block'>
         {/* here i can use name since i had the name state managed above to get data in it.*/}
          welcome {name.name}, 
        </h1>
        
      </div>

    

      <div id="wrapmaintext" className="relative text-center">
        {/* if length is more than 0, that is a row, display the data */}
  {tasks.length > 0 ? (
    tasks.map((task) => (
      <div key={task.id} className="flex flex-col items-center justify-center mb-2">
      
        <h1
        //display status from tasks, and added different color for different status - completed , inprogress and pending.
          className={`mb-2 text-xs px-1 py-0.5 rounded ${
            task.status === 'pending' 
              ? 'text-white mb-2 text-xs bg-red-500 px-1 py-0.5 rounded' 
              : task.status === 'in-progress' 
              ? 'text-white mb-2 text-xs bg-yellow-500 px-1 py-0.5 rounded' 
              : 'text-white mb-2 text-xs bg-green-500 px-1 py-0.5 rounded' 
          }`}
        >
          {task.status}
        </h1>
        
        {/* likewise, title adn description */}
        <div className="border-2 border-dashed border-black px-4 py-3 mb-4">
          <h1 className="text-title z-40 font-bold text-black mb-2">
            {task.title}
          </h1>

          <h1 className="z-40 font-medium text-black mt-2">
            {task.description}
          </h1>
        </div>
{/* now we have click event triggers that transfer the task idalong with them */}
        <div className="flex mt-2">
          <Link
            href={'#!'}
            className="ml-2 text-xxs text-white bg-black px-1 py-0.5 rounded hover:opacity-70"
            onClick={() => handlePending(task.id)}  
          >
            Pending
          </Link>
          <Link
            href={'#!'}
            className="ml-2 text-xxs text-white bg-black px-1 py-0.5 rounded hover:opacity-70"
            onClick={() => handleInprogress(task.id)} 
          >
            In-Progress
          </Link>
          <Link
            href={'#!'}
            className="ml-2 text-xxs text-white bg-black px-1 py-0.5 rounded hover:opacity-70"
            onClick={() => handleCompleted(task.id)} 
          >
            Completed
          </Link>

          <Link
            href={'#!'}
            className="ml-2 text-xxs text-white bg-gray-800 bg-red-700 px-1 py-0.5 rounded hover:opacity-70"
            onClick={() => handleDeleted(task.id)}  
          >
            Delete task
          </Link>
        </div>

        <div className="border-t-2 border-dashed border-gray-400 w-full my-4"></div>
      </div>
    ))
  ) : (
    <div className="text-black font-bold opacity-40 border px-4 py-3  border-dashed border-black">your tasks appear here...</div>
  )}
</div>



{/* again  */}
<div className="my-8"></div>


{/* grep.app inspired me to use light mode, i previously made this all in dark, but then realised that there is something about light mode , its hard to explain. */}
      <div className=' z-40 absolute bottom-0  flex justify-between p-4'>
          <div className="flex gap-4">
            <Link href="#!" className="font-bold text-black">
             built by aryan for bytive' assignment
            </Link>
           
          </div>
        </div>


    </div>
  );
}
