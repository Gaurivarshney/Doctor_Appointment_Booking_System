import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

const RelatedDocs = ({speciality,docId}) => {
    const {doctors} = useContext(AppContext)
    const navigate= useNavigate()
    const [relDoc, setrelDoc]= useState()
     useEffect(()=>{
        if(doctors.length > 0 && speciality){
            const doctorsData= doctors.filter((doc)=>doc.speciality===speciality && doc._id !== docId)
            setrelDoc(doctorsData)
           
        }
     },[docId, speciality, doctors])
    
  return (
    <div>
    <hr/>
      <p className='text-gray-800 text-bold text-xl py-5'>Related Doctors</p>
      <p className='text-gray-600 tetx-md font-normal'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia aliquam sit ea? Repellendus, dolorum? Nulla pariatur harum est doloribus labore possimus, perferendis at provident quos, sequi officia animi accusantium veniam?</p>
      <div className='flex flex-col text-gray-900 gap-4 items-center  md:mx-10'>
        <div className='w-full grid grid-cols-auto gap-4 pt-5 px-3 sm:px-0 gap-y-6'>
            {
                relDoc?.slice(0,5)?.map((item,index)=>(
                    <div key={index} onClick={()=>navigate(`/myappoinment/${item._id}`)} className='border border-blue-200 gap-2 rounded-xl flex flex-col overflow-hidden hover:translate-y-[-10px] transition-all duration-500  cursor-pointer m-2'>
                            <img className='bg-blue-50' src={item.image} alt="" />
                         <div className='p-4'>
                         <div className={`flex flex-row text-md font-semibold ${item.available?'text-green-700':'text-gray-500'} items-center gap-2`}>
                           <p className={`w-2 h-2 ${item.available? 'bg-green-700': 'bg-gray-500' } rounded-full `}></p>
                           <p>{item.available? 'Available': 'Not Available'}</p>
                           </div>
                           <p className='text-gray-900 text-lg font-medium'>{item.name}</p>
                           <p className='text-gray-600 text-sm'>{item.speciality}</p>
                        </div>
                        
                    </div>
                ))
            }
        </div>
   <button onClick={()=>{navigate('/doctors'); scrollTo(0,0)}} className=' bg-blue-50 text-gray-600 rounded-xl gap-4 py-3 px-6'>More</button>
    </div>
    </div>
  )
}

export default RelatedDocs
