import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'

const DoctorList = () => {
  const {doctors, aToken, getAllDoctors,changeAvailability}= useContext(AdminContext)
  useEffect(()=>{
    getAllDoctors()
  },[aToken])
  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <p className='text-gray-900 text-xl font-semibold'>All Doctors</p>
      <div className='flex w-full flex-wrap gap-4 gap-y-6 pt-5'>
        {
          doctors.map((item,index)=>(
            <div className='border border-indigo-200 max-w-56 rounded-lg cursor-pointer' key={index}>
              <img className='bg-indigo-50 hover:bg-primary ' src={item.image} alt="" />
              <div className='p-2 items-start'>
                <p className='text-gray-900 font-semibold text-md'>{item.name}</p>
                <p className='text-gray-600 text-md font-medium'>{item.speciality}</p>
                <div className='flex flex-row gap-2'>
                  <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} className='cursor-pointer' />
                  <p className='text-green-500 font-semibold'>Available</p>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorList
