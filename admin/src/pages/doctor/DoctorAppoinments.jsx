import React, { useContext, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'

const DoctorAppoinments = () => {
    const {dToken, appointments, getAppointments,completeAppointment,cancelAppointment}= useContext(DoctorContext)
  const {calculateAge, slotDateFormat, currency}= useContext(AppContext)
    useEffect(()=>{
        if(dToken){
            getAppointments()
        }
    },[dToken])
  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>
      <div className='bg-white rounded border text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map((item,index)=>(
            <div key={index} className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 border border-b items-center py-3 px-6 text-gray-500 hover:bg-gray-50  '>
              <p className='max-sm:hidden'>{index+1}</p>
              <div className='flex items-center gap-2'>
                <img className='w-12 rounded-full bg-gray-200' src={item.userData.image} alt="" />
                <p className='text-gray-600 font-semibold text-md'>{item.userData.name}</p>
              </div>
              <div>
                <p className='text-sm inline border border-gray-500 px-2 py-1/2 rounded-full'>
                  {item.payment ?'Online':'Cash'}
                </p>
              </div>
              <p className='max-sm:hidden'>
                {calculateAge(item.userData.dob)}
              </p>
              <p>{slotDateFormat(item.slotDate)} , {item.slotTime}</p>
              <p>{currency}{item.amount}</p>

              {
                item.cancelled ?
                <p className='text-red-300 font-bold'>Cancelled</p>: item.isCompleted?
                <p className='text-green-600 font-bold'>Completed</p>
                : <div className='flex'>
               
               <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
               <img onClick={()=>{
                 cancelAppointment(item._id)
               }} className='w-10 cursor-pointer' src={assets.cancel_icon}alt="" />
             </div>
              }
             
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default DoctorAppoinments
