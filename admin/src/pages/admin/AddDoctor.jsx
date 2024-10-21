import React, { useContext, useState } from 'react'
import {assets} from '../../assets/assets'
import { AdminContext } from '../../context/AdminContext'
import {toast} from 'react-toastify'
import axios from 'axios'
const AddDoctor = () => {
  const [image, setImg]=useState(false)
  const [name, setName]= useState('')
  const [email,setEmail]= useState('')
  const [password, setPassword]= useState('')
  const [experience, setExperience]= useState('1')
  const [fees, setFees]= useState('')
  const [speciality, setSpeciality]= useState('General Physician')
  const [degree, setDegree]= useState('')
  const [address1, setAddress1]= useState('')
  const [address2, setAddress2]= useState('')
  const [about, setAbout]= useState('')

  const {backendUrl, aToken}= useContext(AdminContext)

 const onSubmitHandler=async(event)=>{
    event.preventDefault()
    try {
      if(!image){
        toast.error('Image Not Selected 😒')
      }

      const formData= new FormData()
      formData.append('image',image)
      formData.append('name',name)
      formData.append('email',email)
      formData.append('password',password)
      formData.append('experience',experience)
      formData.append('fees',fees)
      formData.append('about',about)
      formData.append('degree',degree)
      formData.append('speciality',speciality)
      formData.append('address', JSON.stringify({
        line1: address1, // First part of the address
        line2: address2  // Second part of the address
    }));

      formData.forEach((value,key)=>{
        console.log(`${key}:${value}`)
      })

          const {data} = await axios.post(backendUrl+'/api/admin/add-doctor',formData, {headers: {aToken}})

          if(data.success){
            toast.success("Doctor Data Added Successfully")
            setImg(false)
            setName('')
            setEmail('')
            setAbout('')
            setAddress1('')
            setAddress2('')
            setPassword('')
            setDegree('')
            setFees('')
          }else{
            toast.error(data.message)
            
          }
      
    } catch (error) {
      toast(error.message)
      console.log(error)
    }
 }

  return (
    <form onSubmit={onSubmitHandler} className='m-5 w-full'>
      <p className='font-bold text-3xl text-gray-500 m-3'>Add Doctor</p>
      <div className='bg-white w-full sm:max-w-4xl max-h-[80vh] overflow-scroll p-10 sm:p-16'>
        <div className='flex flex-col sm:flex-row gap-5 items-center text-gray-500 mb-5'>
          <label htmlFor="doc-img">
            <img className='w-16 bg-gray-200 rounded-full shadow-sm' src={image? URL.createObjectURL(image) :assets.upload_area} alt="" />
          </label>
          <input onChange={(e)=>setImg(e.target.files[0])} type="file"  id='doc-img' hidden/>
          <p className='text-lg font-medium' >Upload Doctor <br /> Picture </p>
        </div>

        <div className='flex flex-col lg:flex-row gap-10 mb-5'>
          <div className='flex flex-1 flex-col w-full '>
            <div className='flex flex-col gap-y-4'>
              <div>
                <p  className='text-gray-500 text-lg font-semibold'>Doctor Name</p>
                <input onChange={(e)=>setName(e.target.value)} value={name} className='border w-full border-zinc-500 rounded-lg py-2 px-4 mt-2' type="text" placeholder='Doctor Name..' required />
              </div>
              <div>
                <p className='text-gray-500 text-lg font-semibold'>Doctor Email</p>
                <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border w-full border-zinc-500 rounded-lg py-2 px-4 mt-2' type="email" placeholder='Doctor Email..' required />
              </div>
              <div>
                <p className='text-gray-500 text-lg font-semibold'>Password</p>
                <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border w-full border-zinc-500 rounded-lg py-2 px-4 mt-2' type="password" placeholder='Enter the password..' required />
              </div>
              <div>
                <p className='text-gray-500 text-lg font-semibold'>Experience</p>
                <select onChange={(e)=>setExperience(e.target.value)} value={experience} className='border w-full border-zinc-500 rounded-lg py-2 px-4 mt-2' name="" id="">
                  <option value="1 year">1 year</option>
                  <option value="2 years">2 years</option>
                  <option value="3 years">3 years</option>
                  <option value="4 years">4 years</option>
                  <option value="5 years">5 years</option>
                  <option value="6 years">6 years</option>
                  <option value="7 years">7 years</option>
                  <option value="8 years">8 years</option>
                  <option value="9 years">9 years</option>
                  <option value="10 years">10 years</option>
                </select>
              </div>
              <div>
                <p className='text-gray-500 text-lg font-semibold'>Fees</p>
                <input onChange={(e)=>setFees(e.target.value)} value={fees} className='border w-full border-zinc-500 rounded-lg py-2 px-4 mt-2' type="number" placeholder='Fees..' required />
              </div>
            </div>
          </div>


      <div className='flex flex-1 flex-col w-full gap-y-4'>
        <div>
          <p className='text-gray-500 text-lg font-semibold'>Speciality</p>
          <select onChange={(e)=>setSpeciality(e.target.value)} value={speciality} className='border w-full border-zinc-500 rounded-lg py-2 px-4 mt-2'>
            <option value="General Physician">General Physician</option>
            <option value="Gynecologist">Gynecologist</option>
            <option value="Dermatologist">Dermatologist</option>
            <option value="Pediatricians">Pediatricians</option>
            <option value="Neurologist">Neurologist</option>
            <option value="Gastroenterologist">Gastroenterologist</option>
          </select>
        </div>
        <div>
          <p className='text-gray-500 text-lg font-semibold'>Education</p>
          <input onChange={(e)=>setDegree(e.target.value)} value={degree} className='border w-full border-zinc-500 rounded-lg py-2 px-4 mt-2' type="text" placeholder='Education'  required/>
        </div>
        
        <div>
          <p className='text-gray-500 text-lg font-semibold'>Address</p>
          <input onChange={(e)=>setAddress1(e.target.value)} value={address1} className='border w-full border-zinc-500 rounded-lg py-2 px-4 mt-2' type="text" placeholder='Line1' required />
          <input onChange={(e)=>setAddress2(e.target.value)} value={address2} className='border w-full border-zinc-500 rounded-lg py-2 px-4 mt-2' type="text" placeholder='Line2' />
        </div>
      </div>

        </div>

        <div>
          <p className='text-gray-500 text-lg font-semibold'>About Doctor</p>
          <textarea onChange={(e)=>setAbout(e.target.value)} value={about} className='border border-zinc-500 rounded-lg w-full py-2 px-4 ' placeholder='Write about doctor' rows={5} required/>
        </div>
       <button type='submit' className='bg-primary px-5 py-3 rounded-full text-white font-medium text-xl my-5'>Add Doctor</button>
      </div>
    </form>
  )
}

export default AddDoctor
