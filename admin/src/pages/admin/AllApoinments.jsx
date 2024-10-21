import React, { useContext, useEffect } from 'react'
import { AdminContext } from '../../context/AdminContext'
import { AppContext } from '../../context/AppContext'
import {assets} from '../../assets/assets.js'
const AllApoinments = () => {
  const {appointments,getAllAppointments, aToken,cancelAppointment}= useContext(AdminContext)
  const {calculateAge,slotDateFormat, currency}= useContext(AppContext)
  useEffect(()=>{
    if(aToken){
      getAllAppointments()
    }
  },[aToken])
  return (
    <div className='w-full m-5 max-w-6xl'>
     
        <p className='mb-3 font-medium text-lg'>All Appointments</p>
        <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
          <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
            <p>#</p>
            <p>Patient</p>
            <p>Age</p>
            <p>Date & Time</p>
            <p>Doctor</p>
            <p>Fees</p>
            <p>Action</p>
          </div>
          {
              appointments?.map((item,index)=>(
                <div className='flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center py-3 px-6 border-b text-gray-500 hover:bg-gray-50' key={index}>
                  <p className='max-sm:hidden'>{index+1}</p>
                  <div className='flex items-center gap-2'>
                    <img className='w-12 rounded-full bg-gray-200' src={item.userData.image} alt="" /><p>{item.userData.name}</p>
                  </div>
                  <p  className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
                  <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
                  <div className='flex items-center gap-2'>
                    <img className='w-12 rounded-full bg-gray-200' src={item.docData.image} alt="" /><p>{item.docData.name}</p>
                  </div>
                  <p>{currency}{item.amount}</p>
                  {
                    item.cancelled ? <p className='text-red-400 font-medium text-sm'>Cancelled</p>: item.isCompleted ? <p className='text-green-500 font-medium text-sm'>Completed</p> :
                  <img  onClick={()=>cancelAppointment(item._id)} className='w-8  rounded cursor-pointer' src={assets.cancel_icon} alt="" />
                  }
                </div>
              ))
            }
        </div>
     
    </div>
  )
}

export default AllApoinments