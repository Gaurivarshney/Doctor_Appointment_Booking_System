import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Appoinment = () => {
   

    const {backendUrl, token,getDoctorsData}= useContext(AppContext)
  const navigate =useNavigate()
    const [appointments, setAppointments]= useState([])
    const months= ["","Jan", "Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
    const slotDateFormat=(slotDate)=>{
      const dateArray= slotDate.split('_')
      return dateArray[0]+ " "+ months[Number(dateArray[1])]+ " "+dateArray[2]
    }
    const getUserAppointments= async()=>{
      try {
        const {data}= await axios.get(backendUrl+'/api/user/user-appointments', {headers:{token}})
        console.log(data)
        if(data.success){
          setAppointments(data.appointments.reverse())
          // console.log(data.appointments)
        }
        
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

    const cancelAppointment = async(appointmentId)=>{
      try {
        console.log(appointmentId)
        const {data}= await axios.post(backendUrl+'/api/user/cancel-apponiment', {appointmentId},{headers:{token}})
        if(data.success){
          toast.success(data.message)
          getUserAppointments()
          getDoctorsData()

        }else{
          toast.error(data.message)
        }
      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }

  const initpay =(order)=>{
    const options ={
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name:'Appintment Payment',
      description:'Appintment Payment',
      order_id:order.id,
      receipt:order.receipt,
      handler:async(response)=>{
        console.log(response)

        try {
          const {data}= await axios.post(backendUrl+'/api/user/verifyRazorpay', response, {headers:{token}})

          if(data.success){
            getUserAppointments()
            navigate('/appoinment')
          }
        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp= new window.Razorpay(options)
    rzp.open()
  }

    const appointmentRazorPay= async(appointmentId)=>{
      try {
        const {data}= await axios.post(backendUrl+'/api/user/payment-razorpay',{appointmentId},{headers:{token}})
        if(data.success){
          console.log(data.order)
          initpay(data.order)
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message);
      }
    }


    useEffect(()=>{
    if(token){
      getUserAppointments()
    }
    },[token])
  return (
    <div>
      <p className='text-2xl md:text-3xl text-gray-600 text-center font-semibold'>My Appoinment</p>
      <div >
       {
        appointments?.map((item,index)=>(
            <div key={index} className='md:grid md:grid-cols-[1fr_5fr] sm:flex  sm:gap-6 border border-zinc-600 rounded-lg m-2 p-3 items-center min-h-[200px] flex flex-col'>
            <div>
                <img className='w-40 bg-blue-50 m-4' src={item.docData.image} alt="" />
            </div>
            <div className='flex flex-col  text-gray-800 text-sm font-medium sm:justify-center'  >
                <p className='text-lg text-gray-900 font-bold'>{item.docData.name}</p>
                <p>{item.docData.speciality}</p>
                <p className='text-lg text-gray-900 font-bold'>Address:</p>
                <p>{item.docData.address.line1}</p>
                <p>{item.docData.address.line2}</p>
                <p><span>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}</p>
            </div>
           <div></div>
            <div className='flex flex-col sm:gap-2 justify-end md:absolute md:right-[200px] '>

            {
              !item.cancelled && item.payment && !item.isCompleted && <button className='border sm:font-medium min-w-[70px] sm:w-full  text-lg border-blue-100  bg-indigo-100 rounded-lg p-4 m-2 sm:m-3'>Paid</button>
            }
                {
                  !item.cancelled && !item.payment && !item.isCompleted &&<button onClick={()=>appointmentRazorPay(item._id)} className='border sm:font-medium min-w-[70px] sm:w-full  text-lg border-zinc-800 rounded-lg p-4 m-2 sm:m-3 hover:scale-90 hover:bg-primary hover:text-white transition-all duration-100' >Pay Online</button>
                }
                {
                  !item.cancelled && !item.isCompleted &&<button onClick={()=>cancelAppointment(item._id)} className='border sm:font-medium min-w-[70px] sm:w-full text-lg border-zinc-800 rounded-lg p-4 m-2 sm:m-3  hover:scale-90 hover:bg-primary hover:text-white transition-all duration-100 ' >Cancel Appoinment</button>
                }
                {item.cancelled && !item.isCompleted &&<button className='sm:min-w-48 py-2 border border-red-500 rounded text-red-500'>Appointment Cancelled</button> }

                {
                  item.isCompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>Completed</button>
                }
            </div>
            </div>

        ))
       }
      </div>
    </div>
  )
}

export default Appoinment

