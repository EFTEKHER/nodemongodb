import React, { useEffect, useRef, useState } from 'react';
import img from '../assets/up.jpg';
import { useNavigate } from 'react-router-dom';

const Card = () => {
  const myStyle = {
    backgroundImage: `url(${img})`,
  };
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [image,setImage]=useState('');
  const nameRef = useRef();
  const emailRef = useRef();
  const imageRef = useRef();
const navigate= useNavigate();
  const usehandler = async (e) => {
    e.preventDefault();
    const namex = nameRef.current.value;
    const emailx = emailRef.current.value;
    const imagex= imageRef.current.value;
    const newUser = { name: namex, email: emailx , image: imagex};

    // Post Method
    try {
      const response = await fetch("http://localhost:5000/users", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok' + response.statusText);
      }

      const data = await response.json();
      if (data.acknowledged) {
        alert('Data inserted successfully');
        setEmail('');
        setName('');
        nameRef.current.value = '';
        emailRef.current.value = '';
        imageRef.current.value = '';
      }
      console.log(data);

    } catch (error) {
      console.error('Failed to post new user:', error);
    }
  };

  const deleteHandler = async (id) => {
    const uri = `http://localhost:5000/users/${id}`;
    try {
      const response = await fetch(uri, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };
const viewHandler=id=>{
navigate(`/users/view/${id}`);
}
const updateHandler=id=>{
  navigate(`/users/update/${id}`);
}
  useEffect(() => {
    // Get users API
    fetch("http://localhost:5000/users")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, [users]);

  return (
    <div className='bg-cover h-[100vh] w-full content-center' style={myStyle}>
      <div className='grid grid-cols-1 lg:grid-cols-3 p-10 mx-auto rounded-2xl'>
        <div className='bg-slate-900 w-full text-white space-y-3 p-4 content-center'>
          <h2 className='text-center text-4xl'>Add New User</h2>
          <input
            ref={nameRef}
            type="text"
            value={name}
            className='w-[90%] h-10 text-center rounded-xl text-black'
            onChange={(e) => setName(e.target.value)}
            placeholder='Name:'
          />
          <input
            type="email"
            value={email}
            className='w-[90%] h-10 text-center rounded-xl text-black'
            ref={emailRef}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='Email:'
          />
          <input type='text'  value={image}
          className='w-[90%] h-10 text-center rounded-xl text-black'
          ref={imageRef}
          onChange={(e) => setImage(e.target.value)}  placeholder='enter image link:' />
          <button className='p-2 rounded-xl bg-orange-700 text-white' onClick={usehandler}> Add User</button>
        </div>

        <div className='bg-orange-600 sm:col-span-1 lg:col-span-2 w-full p-4'>
          <h2 className='text-4xl'>Our Employees</h2>
          <br />
          <hr />
          <table className='table-auto w-full border-collapse'>
            <thead className=''>
              <tr className='bg-gray-200'>
                <th className='px-4 py-2'>profile</th>
                <th className='px-4 py-2'>Name</th>
                <th className='px-4 py-2'>Email</th>
                <th className='px-4 py-2'>Action</th>
              </tr>
            </thead>
            <tbody className=''>
              {users.length ? (
                users.map((item) => (
                  <tr key={item._id} className='hover:bg-gray-100'>
                    <td className='px-4 py-2'><img src={item.image} alt=""  className='h-20 w-20 rounded-full' /></td>
                    <td className='px-4 py-2'>{item.name}</td>
                    <td className='px-4 py-2'>{item.email}</td>
                    <td className='px-4 py-2'>
                      <button className='bg-blue-500 text-white px-4 py-2 rounded' onClick={()=>viewHandler(item._id)}>
                        View
                      </button>
                      <button className='bg-yellow-500 text-white px-4 py-2 rounded ml-2' onClick={() => deleteHandler(item._id)}>
                        Delete
                      </button>
                      <button className='bg-green-500 text-white px-4 py-2 rounded ml-2' onClick={()=>updateHandler(item._id)}>
                        Update
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className='px-4 py-2' colSpan="4">Loading....</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Card;
