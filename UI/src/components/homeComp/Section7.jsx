import React from 'react'
import "../../cssFile/Section3.css";

const Section7 = () => {
  return (
    <div className='flex px-20 py-4'>
        <div className=' flex flex-col justify-center pr-8'>
            <h1>Gen-Gym</h1>
            <p className='font-mono'>Join our expert-led fitness classes designed for every level. Build strength, boost stamina, stay motivated, and transform your body with structured workouts in a high-energy gym environment.Gen-Gym.</p>
            <button className='bg-amber-500 w-36 py-2 mt-10 rounded-full font-bold text-xl hover:bg-amber-600'>Join Classes</button>
        </div>
        <div>
            <img className='w-[100rem]' src="https://png.pngtree.com/png-clipart/20220429/original/pngtree-gym-gymnasium-body-building-exercise-training-fitness-workout-png-image_7579834.png" alt="" />
        </div>
    </div>
  )
}

export default Section7