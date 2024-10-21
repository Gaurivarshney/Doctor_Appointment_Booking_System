import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div className=''>
    <hr className='mt-10'  />
    {/* -------left section-------- */}
     <div className='flex flex-col sm:grid grid-cols-[3fr_2fr_1fr] gap-14 text-sm  p-5 m-10'>
     <div className=' md:w-2/3'>
        <img className='mb-5 w-40' src={assets.logo} alt="" />
        <p className='w-full md:w-full text-gray-900 leading-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iusto neque quia debitis, aut id aperiam inventore voluptatibus nam. Pariatur, quas? Lorem ipsum dolor sit amet consectetur adipisicing elit. </p>
      </div>

      {/* ------center section-------- */}
      <div >
        <p className='text-xl font-semibold mb-5'>COMPANY</p>
       
       <ul className='flex flex-col text-gray-600 gap-2'>
            <li>HOME</li>
            <li>ABOUT</li>
            <li>CONTACT US</li>
            <li>PRIVACY POLICY</li>
        </ul>
       
      </div>

      {/* ----------right section-------- */}
      <div>
        <p className='text-xl font-semibold mb-5'>GET IN TOUCH</p>
        <p className='text-md text-gray-600 gap-2'>8521549665</p>
        <p className='text-md text-gray-600 gap-2'>prescripto@gmail.com</p>
      </div>
     </div>
     <div className='my-10'>
        <hr />
        <p className='text-center py-5 text-gray-900 text-[20px]'>Copyright 2024@ prescripto -All Right Reserved.</p>
     </div>
    </div>
  )
}

export default Footer
