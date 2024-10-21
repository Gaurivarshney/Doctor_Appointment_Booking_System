import React from 'react'
import { assets } from '../assets/assets'
import { Navigate, useNavigate } from 'react-router-dom'

const Banner = () => {
    const navigate = useNavigate();
  return (
    <div className='flex items-center justify-between px-6 sm:px-10 md:px-14 lg:px-12 md:mx-10 bg-primary rounded-xl my-20 py-10'>
      <div className='flex-1 py-8 sm:py-10 md:py-16 lg:py-24 lg:pt-5'>
        <div className='items-center text-white font-medium text-xl sm:text-2xl md:text-4xl lg:5xl'>
            <p className=''>Book Appoinment</p>
            <p className='pt-3'>With 100+ Trusted Doctors</p>
        </div>
        <button onClick={()=>{navigate('/login'); scrollTo(0,0)}} className='bg-white p-3 font-medium hover:scale-90 text-gray-900 rounded-3xl mt-10'>Create Account</button>
      </div>
      <div className='hidden md:block md:w-1/2 lg:w-[370px] relative'>
        <img className='w-full absolute right-0 max-w-md bottom-[-190px]' src={assets.appointment_img} alt="" />
      </div>
    </div>
  )
}

export default Banner
