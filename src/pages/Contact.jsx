import React from 'react'
import { assets } from '../assets/assets'
function Contact() {
  return (
    <div>
      <div>
    <h1 className='text-2xl md:text-3xl text-gray-600 text-center font-semibold'> CONTACT <span className='text-gray-900'>US</span></h1>
      <div className='flex flex-col md:flex-row my-10 gap-3  max-w-[60%] m-auto'>
        
          <img className='w-[50%] ' src={assets.contact_image} alt="" />
      
       <div>
       <div className='flex flex-col '>
         <p className='text-md md:text-xl text-gray-600 p-2 font-semibold'>Our Office</p>
         <p className='text-gray-800  text-md p-2'>578148 Williams Stations</p>
         <p className='text-gray-800  text-md p-2'>Suite 350, washington USA</p>
         <p className='text-gray-800  text-md p-2'>Tel: 888 526 893</p>
         <p className='text-gray-800  text-md p-2'>Email: prescripto@gmail.com</p>
        </div>
        <div>
          <p className='text-md md:text-xl text-gray-600 p-2 font-semibold'>CAREERS AT PRESCRIPTO</p>
          <p className='text-gray-800  text-md p-2'>Learn mpre about our job profiles and openings</p>
        </div>
        <button className='m-2 border border-gray-700 p-3 rounded-md hover:scale-105 transition-all duration-300'>Explore More</button>
       </div>
      </div>

    </div>
    </div>
  )
}

export default Contact
