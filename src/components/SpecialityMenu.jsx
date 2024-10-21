import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'
const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-gray-800 '>
      <h1 className='font-semibold text-md md:text-xl lg:text-4xl '>Find By Speciality</h1>
      <p className='sm:w-1/3 text-center text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, quidem,</p>
      <div className='flex flex-row justify-center w-full pt-5 overflow-x-scroll gap-4 '>
        {
            specialityData.map((item,index)=>(
                <Link onClick={()=>scrollTo(0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index} to={`/doctors/${item.speciality}`}>
                    <img className='w-16 sm:w-24 mb-2' src={item.image} alt="" />
                    <p>{item.speciality}</p>
                </Link>
            ))
        }
      </div>
    </div>
  )
}

export default SpecialityMenu
