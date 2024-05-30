import React from 'react'

const Card = ({name,phone,email}) => {
  return (
    <div className=' w-[400px] h-[300px] bg-slate-800 text-white rounded-2xl shadow-2xl hover:shadow-slate-950 hover:scale-110 p-5 m-5'>
    <h2 className='text-3xl text-center'>Name:{name}</h2>
    <h2 className='text-xl text-center'>Email:{email}</h2>
    <h2 className='text-3xl text-center'>Name:{phone}</h2>

    </div>
  )
}

export default Card
