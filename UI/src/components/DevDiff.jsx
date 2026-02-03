import React from 'react'
import { Link } from 'react-router-dom'

const DevDiff = (props) => {
  return (
    <div className='w-full h-full flex flex-col items-center justify-center gap-5'>
        <div className='w-full h-3/4 flex items-center justify-between gap-12 p-12'>
            {props.val.map((item, idx)=>{
                return (
                    <div key={idx} className='h-60 w-55  bg-amber-100 flex flex-col items-center justify-center text-center float-left gap-4 p-5 rounded-lg border-amber-800 overflow-hidden'>
                        <img className='w-20 mt-[-20px]' src={item.img} alt="" />
                        <h1 className='text-xl font-serif font-bold'>{item.title}</h1>
                        <p className='text-[15px] font-thin font-serif'>{item.desc}</p>
                    </div>
                )
            })}
        </div>
        
        <div className='w-full flex flex-col items-center justify-center gap-4 text-center'>
            <p className='text-[15px] font-thin font-serif'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid amet sint quos modi? Sapiente, corrupti!</p>
            <h2 className='text-xl font-serif font-bold text-amber-950'>Get started today</h2>
            <Link to="/register">
                <button className='bg-amber-500 text-white px-6 py-2 rounded-full hover:bg-amber-600 transition duration-300'>Register Now</button>
            </Link>   
        </div>
    </div>
  )
}

export default DevDiff