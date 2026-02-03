import React from 'react'
import DevDiff from '../DevDiff';

const QualityIcon = [
    {
        img: "./public/images/dumbbell.png",
        title: "Supreme equipment",
        desc: "We provide the supreme equipment"
    },
    {
        img: "./public/images/achievement.png",
        title: "High Quality",
        desc: "We provide the highest quality"
    },
    {
        img: "./public/images/trainer.png",
        title: "Extraordinary",
        desc: "We provide extraordinary services"
    },
    {
        img: "./public/images/affordable.png",
        title: "Affordable Price",
        desc: "Our gym prices are easy to afforded"
    }
]

const Deff = () => {
    
  return (
        <div className='w-[100%] h-full flex flex-col items-center justify-center gap-10 py-20'>
            <div className='w-full flex flex-col items-center justify-center gap-4 text-center px-20'>
                <h1 className='text-4xl font-serif font-bold text'>Why are we different?</h1>
                <p className='text-[15px] font-thin font-serif'>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
            </div>
            <div className='w-full h-3/4 flex items-center justify-between gap-12'>
                <DevDiff val={QualityIcon} />
            </div>
            
        </div>
     )
}

export default Deff;