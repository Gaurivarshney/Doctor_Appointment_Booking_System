import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDocs from '../components/RelatedDocs';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function MyAppoinment() {
  const {docId}= useParams()
  const navigate = useNavigate()
  const {doctors,currencySymbol, backendUrl,getDoctorsData, token} = useContext(AppContext)
  const [docInfo, setDocInfo]= useState(null)
  const [docSlot, setDocSlot] =useState([])
  const [slotIndex, setSlotIndex]= useState(0)
  const [slotTime, setSlotTime]= useState('')
  const daysOfWeek =['SUN', 'MON','TUE', 'WED', 'THU','FRI','SAT']

 const bookAppointment=async()=>{
    if(!token){
      toast.warn('Login to book appoinment')
      return navigate('/login')
    }

    try {
      const date = docSlot[slotIndex][0].datetime

      let day= date.getDate()
      let month= date.getMonth()+1
      let year= date.getFullYear()

      const slotDate = day+ "_" +month+ "_"+year
      
      const{data}=  await axios.post(backendUrl+'/api/user/book-apponiment',{docId, slotDate, slotTime}, {headers:{token}})
      if(data.success){
        toast.success(data.message)
        getDoctorsData()
        navigate('/appoinment')
      }else{
        toast.error(data.message)
        console.log(data.message)
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
 }

  const getAvailableSlots = async ()=>{
    // clear previous slots
    setDocSlot([])

    //gettting current date
    let today = new Date()
    for(let i=0; i<7; i++){
      let currentDate = new Date(today)
      currentDate.setDate(today.getDate()+i)

      //setting end time of the date with the index
      let endTime = new Date()
      endTime.setDate(today.getDate()+i)
      endTime.setHours(21,0,0,0)

      //setting  hours
      if(today.getDate()===currentDate.getDate()){
        currentDate.setHours(currentDate.getHours() >10 ? currentDate.getHours()+1 : 10)
        currentDate.setMinutes(currentDate.getMinutes()>30 ? 30: 0) 
      }else{
        currentDate.setHours(10)
        currentDate.setMinutes(0)
      }
      let timeSlots =[]
      while(currentDate<endTime){
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

        let day= currentDate.getDate()
        let month= currentDate.getMonth()+1
        let year= currentDate.getFullYear()
  
        const slotDate = day+ "_" +month+ "_"+year
        const slotTime= formattedTime
        const isSlotAvailable= docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime)? false :true
        if(isSlotAvailable){

          timeSlots.push({
            datetime: new Date(currentDate),
            time: formattedTime
          })
        }

        currentDate.setMinutes(currentDate.getMinutes() + 30)
      }
      setDocSlot(prev=> ([...prev, timeSlots ]))
    }
  }


  const fetchDocInfo = async ()=>{
    const docInfo = doctors.find(doc =>doc._id === docId)
    setDocInfo(docInfo)
    // console.log(docInfo)
  }
  useEffect(()=>{
    fetchDocInfo()
  },[doctors, docId])

  useEffect(()=>{
getAvailableSlots()
  },[docInfo])

// useEffect(()=>{
//   console.log(docSlot)
// },[docSlot])

  return docInfo && (
    <div>
      <div className='flex flex-col sm:flex-row border border-gray-400 rounded-xl gap-5'>
        <div>
          <img className='w-full  bg-primary rounded-lg  m-3 sm:max-w-72'  src={docInfo.image} alt="" />
        </div>
        <div className='m-3  flex-1 flex-col justify-center'>
          
          <div>
          <p className='text-gray-900 font-semibold text-3xl flex flex-row gap-3  py-2'>{docInfo.name} 
            <img className='w-5' src={assets.verified_icon} alt="" />
            </p>

          </div>
            <div className=' flex flex-row  gap-4'>
              <p className='text-gray-600 font-semibold text-xl'>{docInfo.degree}-{docInfo.speciality}</p>
              <button className='border border-gray-600 text-sm p-1 text-center w-4/2 rounded-lg'>{docInfo.experience}</button>
            </div>
             <div className='flex flex-col my-2'>
              <p className='flex flex-row gap-4 py-2 text-gray-600'>About
              <img className="w-5" src={assets.info_icon} alt="" />
              </p>

              <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit, similique reprehenderit fuga perspiciatis ut repudiandae fugiat voluptas asperiores soluta a! Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae cupiditate quaerat fugit iure illo amet unde ipsa, est nobis magni quia facere odio nam rerum maxime, dolorum corrupti architecto? Ad.</p>
             </div>
          <div>
          <hr className='text-gray-800'/>
            <p className='py-3 text-xl font-semibold text-gray-900'>
              Appoinment Fees : <span className='text-red-700'>{currencySymbol}{docInfo.fees}</span>
            </p>
          </div>
        </div>

      </div>

      {/* Booking SLots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-medium'>
       <p className='text-gray-800 text-bold text-xl py-5'>Booking Slots</p>
       <div className='flex flex-row gap-5 overflow-x-scroll w-full items-center'>
        {
          docSlot.length && docSlot.map((item,index)=>(
            <div onClick={()=>setSlotIndex(index)} key={index} className={`flex flex-col items-center text-md font-semibold min-w-16 cursor-pointer p-2 border rounded-xl text-gray-600 ${slotIndex===index? 'bg-primary text-white':'border-gray-600'}`}>
            <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
            <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))
        }
       </div>

       <div className='flex flex-row overflow-x-scroll gap-6 items-center my-5 w-full'>
        {
          docSlot.length && docSlot[slotIndex].map((item, index)=>(
            <p onClick={()=>{
              setSlotTime(item.time)
            }} key={index} className={`border min-w-16 text-center justify-center text-gray-600 cursor-pointer font-semibold text-sm rounded-full p-5 ${item.time===slotTime? 'bg-primary text-white':'border-gray-600'}`}>
              {
                item.time.toLowerCase()
              }
            </p>
          ))
        }
       </div>

       <div>
        <button onClick={bookAppointment} className='m-5 items-center w-[30%] border bg-primary p-4 text-white rounded-full text-lg font-normal hover:bg-blue-400 hover:translate-y-[-5px] transition-all duration-500'>Book Appoinment</button>
       </div>

       <RelatedDocs docId={docId} speciality={docInfo.speciality}/>
      </div>
    </div>
  )
}
