import React from 'react'
import Typed from 'react-typed'
import jake from '../images/jake_circle.png';



const Homepage = () => {
  return (
      <div className='bg-[#D62311] w-screen h-screen py-16 px-4 text-white overflow-hidden'>
        <div className='max-w-[1512px] mx-auto grid md:grid-cols-2'>
          <div className='max-w-[756px] mx-auto pt-24 text-left flex flex-col justify-start'>
            <p className='md:text-7xl sm:text-6xl text-4xl font-bold'>DISASTER DRONE</p>
            <p className='text-[#f2ddbb] md:text-4xl sm:text-4xl text-xl font-bold'>A StateFarm Sponsored Project</p>
            <div className='flex justify-left'> 
              <p className='md:text-3xl sm:text-2xl text-xl font-bold'>Making insurance cases </p>
              <Typed 
              className='md:text3xl sm:text-3xl text-xl font-bold pl-2'
              strings={['risk free.', 'danger free.', 'future forward.']} 
              typeSpeed={30} 
              backSpeed={20} 
              loop/>
            </div>
          </div>
          <img className='max-w-[756px] mx-auto scale-70' src={jake} alt='jake' />
        </div>
      </div>
  )
}
export default Homepage