import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

const View = () => {
    const id=useParams().id;
    const [user,setUser]=useState([]);
    useEffect(()=>{
        const uri =`http://localhost:5000/users/${id}`;
        fetch(uri).then((res)=>res.json()).then((data)=>setUser(data));
    },[])
  return (
    <div className=' h-[100vh] w-full space-y-4'>
    <div className='flex mx-auto items-center justify-center'>
    <Link to={"/"}>
    <button className='p-4 w-auto bg-red-700 text-center mt-8'>Go to home</button>
    </Link>
    </div>
      <div className='w-[500px] h-[400px] bg-slate-800 space-y-6 text-white p-10 mx-auto shadow-2xl shadow-slate-950 hover:scale-110'>
      <h2 className='text-center'>Welcome to view</h2>
      <img src={user.image} alt="" className='h-20 w-20 rounded-full' />
      <h2>Hello {user.name}</h2>
      <h2>email:{user.email} </h2>

      </div>
    </div>
  )
}

export default View
