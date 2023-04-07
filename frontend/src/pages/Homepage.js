import React from 'react'
import Typed from 'react-typed'
import jake from '../images/jake_circle.png';



const Homepage = () => {
  return (
    <div className='flex flex-row text-white bg-[#D62311] w-screen h-screen'>
      <div className='max-w-[1240px] w-full h-full mx-auto pt-24 text-left flex flex-col justify-start'>
        <p className='md:text-8xl sm:text-6xl text-4xl font-bold'>DISASTER DRONE</p>
        <p className='text-[#f2ddbb] md:text-6xl sm:text-4xl text-xl font-bold'>A StateFarm Sponsored Project</p>
        <div className='flex justify-left'> 
          <p className='md:text-5xl sm:text-3xl text-xl font-bold'>Making insurance cases </p>
          <Typed 
            className='md:text-5xl sm:text-3xl text-xl font-bold pl-2'
            strings={['risk free.', 'danger free.', 'future forward.']} 
            typeSpeed={30} 
            backSpeed={20} 
            loop/>
        </div>
      </div>
    </div>
  )
}
export default Homepage