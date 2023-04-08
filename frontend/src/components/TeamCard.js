import React from 'react'
import profile from '../images/dd-logo.png'

function TeamCard() {
  return (
    <div className='flex flex-col bg-white h-[25em] w-[20em] rounded-lg items-center pt-6'>
        <img className='flex w-[10em] h-[10em]' src={profile} alt ='/' />
        <div className='flex flex-col m-w-[10em] justify-center items-center'>
            <p className='text-black text-[1.5em] font-bold px-2 pt-2 pb-0 mb-0'>Mario Villatoro</p>
            <p className='text-slate-900 text-[1em] px-2 pt-0 mt-0 pb-0 mb-0'>Full Stack Website Creator</p>
            <p className='text-center text-slate-600 text-[1em] px-2 pt-0 mt-0 pb-0 mb-0'>Javascript, React JS, TailwindCSS, Google Cloud Platform, MongoDB, NodeJS</p>
        </div>  
    </div>
  )
}
export default TeamCard
