import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../context/AppContext';

export default function Doctors() {
  const {doctors} = useContext(AppContext);
  const {speciality}=useParams()
  const [filterDoc, setFilterDoc]= useState([])
  const [showFilter , setShowFilter]= useState(false)
  const navigate = useNavigate()
  const applyFilter =()=>{
    if(speciality){
      setFilterDoc(doctors.filter(doc=>doc.speciality===speciality))
    }else{
      setFilterDoc(doctors)
    }
  }
  useEffect(()=>{
    applyFilter()
  },[doctors, speciality])
  return (
    <div>
        <p className='text-2xl py-5 font-medium text-gray-600'>Browse through the Doctor Speacility.</p>
      <button onClick={()=>setShowFilter(prev=> !prev)} className={`sm:hidden border border-gray-800 px-3 py-2 cursor-pointer w-[94vm] my-2 text-center hover:scale-10 transition-all duration-300 rounded-2xl text-xl ${showFilter? 'bg-primary text-white':''}`}>Filter</button>
      <div className='flex flex-col md:flex-row gap-10'>
      <div className={`flex flex-col text-xl text-gray-700 ${showFilter? 'flex':'hidden sm:flex'}`}>
        <p onClick={()=> speciality === 'General physician' ? navigate('/doctors') : navigate('/doctors/General physician') } className={`sm:w-auto border border-gray-200 px-3 py-2 font-normal cursor-pointer w-[94vm] my-2 text-center hover:translate-y-[-5px] transition-all duration-300 rounded-2xl ${speciality === 'General physician'? "bg-blue-50" :""}`}>General physician</p>
        <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors') : navigate('/doctors/Gynecologist') } className={`sm:w-auto border border-gray-200 px-3 py-2 font-normal cursor-pointer w-[94vm] my-2 text-center hover:translate-y-[-5px]  transition-all duration-300 rounded-2xl ${speciality === 'Gynecologist'? "bg-blue-50" :""}`}>Gynecologist</p>
        <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors') : navigate('/doctors/Dermatologist') } className={`sm:w-auto border border-gray-200 px-3 py-2 font-normal cursor-pointer w-[94vm] my-2 text-center hover:translate-y-[-5px]  transition-all duration-300 rounded-2xl ${speciality === 'Dermatologist'? "bg-blue-50" :""}`}>Dermatologist</p>
        <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors') : navigate('/doctors/Pediatricians') } className={`sm:w-auto border border-gray-200 px-3 py-2 font-normal cursor-pointer w-[94vm] my-2 text-center hover:translate-y-[-5px] transition-all duration-300 rounded-2xl ${speciality === 'Pediatricians'? "bg-blue-50" :""}`}>Pediatricians</p>
        <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors') : navigate('/doctors/Neurologist') } className={`sm:w-auto border border-gray-200 px-3 py-2 font-normal cursor-pointer w-[94vm] my-2 text-center hover:translate-y-[-5px] transition-all duration-300 rounded-2xl ${speciality === 'Neurologist'? "bg-blue-50" :""}`}>Neurologist</p>
        <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors') : navigate('/doctors/Gastroenterologist') } className={`'sm:w-auto border border-gray-200 px-3 py-2 font-normal cursor-pointer w-[94vm] my-2 text-center hover:translate-y-[-5px]  transition-all duration-300 rounded-2xl ${speciality === 'Gastroenterologist'? "bg-blue-50" :""}`}>Gastroenterologist</p>
      </div>
      <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
        {
          filterDoc.map((item,index)=>(
                    <div onClick={()=>navigate(`/myappoinment/${item._id}`)} className='border border-blue-200 gap-2 rounded-xl flex flex-col overflow-hidden hover:translate-y-[-10px] transition-all duration-500  cursor-pointer m-2'>
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
      </div>
    </div>
  )
}
