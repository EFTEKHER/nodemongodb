import React, { useEffect, useState } from 'react'
import Card from './Card';

const User = () => {
    const [users,setUsers]= useState([]);
    useEffect(()=>{
         fetch("http://localhost:5000/usersx").then(res=>res.json()).then(data=>setUsers(data));
    },[])
  return (
    <div className='grid grid-cols-1 md:grid-cols-2  lg:grid-cols-3'>
      {
        users.length > 0 && users.map((user)=>{
            return <Card key={user.id} name={user.name} email={user.gmail} phone={user.phone}/>
        })
      }
    </div>
  )
}

export default User
