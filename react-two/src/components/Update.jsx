import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Update = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const uri = `http://localhost:5000/users/${id}`;
    fetch(uri)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  console.log(id);
  console.log(user);

  if (!user) {
    return <div>Loading...</div>;
  }

  const x = user.name;
  console.log(x);
  const nameUpdate =e=>{
    const name=e.target.value;
    const updatedName={name:name,email:user.email};
    setUser(updatedName)
  }
  const emailUpdate =e=>{
    const email=e.target.value;
    const updatedEmail={name:user.name,email:email};
    setUser(updatedEmail);
  }
  const uploadHandler=e=>{
    e.preventDefault();
    const uri=`http://localhost:5000/users/${id}`;
    fetch(uri,{
      method: 'PUT',
      headers:{
        'content-type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res=>res.json()).then(data=>{
      if(data.acknowledged)
        {
          alert("Data Inserted successfully");
        }
    });
  }
  return (
    <div className='h-[100vh] w-full bg-purple-500 text-white'>
      <div className='flex justify-center items-center'>
        <Link to="/">
          <button className='px-5 bg-green-700 text-center'>Go to Home</button>
        </Link>
      </div>

      <div className='border p-8 h-[80vh] w-[60%] bg-slate-700 rounded-2xl shadow-2xl hover:scale-105 mx-auto mt-10 flex flex-col justify-center'>
        <h1 className='text-center'>Update Info</h1>

        <form action="">
          <input
            type="text"
            value={user.name || ""}
            onChange={nameUpdate}
            className='w-[90%] h-10 text-center rounded-xl text-black mx-auto mt-10'
          />
          <input
            type="email"
            value={user.email || ""}
            className='w-[90%] h-10 text-center rounded-xl text-black mx-auto mt-10'
            onChange={emailUpdate}
          />
          <div className='mt-10'>
            <button type='submit' className='bg-yellow-600 px-4 rounded' onClick={uploadHandler}>Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
