import React from 'react'
import {assets} from '../assets/assets'
const Header = () => {
  return (
    <div className='flex  flex-col md:flex-row flex-wrap bg-primary rounded-lg px-6 md:px-10 lg:px-20 pt-20'>
    
      {/* ----------left side div---------- */}
    <div className='md:w-1/2 flex flex-col justify-start items-start gap-4 py-10  m-auto md:py-[10vm] md:mb[-30px]'>
    <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointments <br /> With Trusted Doctors </p>
    <div className='flex flex-col md:flex-row items-center justify-start gap-2 text-white font-light'>
        <img className='w-20' src={assets.group_profiles} alt="" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis <br className='hidden md:block'/> porro quod temporibus? </p>
    </div>
    <a href="#speciality" className='flex flex-row rounded-full bg-white text-gray-600 gap-2 py-2 px-2 mt-3 font-semibold hover:scale-105 transition-all duration-300 '>
        Book Appointment <img src={assets.arrow_icon} alt="" />
    </a>
    </div>
      {/* --------------right side div--------- */}
      <div className='md:w-1/2 relative'>
        <img className='w-full  md:absolute bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
      </div>
    </div>
  )
}

export default Header
