import React from 'react'
import profile from '../images/dd-logo.png'

const TeamCard = ({name, title, stack, imagePath, key}) => {
  return (
    <div className='flex flex-col bg-white drop-shadow-lg h-[19em] w-[15em] rounded-lg items-center pt-6 mx-6 my-2'>
        <img className='flex w-[10em] h-[10em]' key={key} src={imagePath} alt="example"/>
        <div className='flex flex-col m-w-[10em] justify-center items-center'>
            <p className='text-black text-[1.25em] font-bold px-2 pt-2 pb-0 mb-0'>{name}</p>
            <p className='text-slate-900 text-[0.75em] px-2 pt-0 mt-0 pb-0 mb-0'>{title}</p>
            <p className='text-center text-slate-600 text-[0.75em] px-2 pt-0 mt-0 pb-0 mb-0'>{stack}</p>
        </div>  
    </div>
  )
}
export default TeamCard
