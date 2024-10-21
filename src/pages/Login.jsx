import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext.jsx'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const [state , setState] = useState('Sign Up')
  const [name, setName]= useState('')
  const [email, setEmail]= useState('')
  const [password, setPassword] =useState('')
   
  const {backendUrl, token , setToken}= useContext(AppContext)

const navigate = useNavigate();
  const onSubmitHandler = async(e)=>{
      e.preventDefault()

      try {
        if(state==='Sign Up'){
            const {data}= await axios.post(backendUrl+'/api/user/register',{name,password,email})
            if(data.success){
              console.log('success')
              localStorage.setItem('token',data.token)
              setToken(data.token)
            }else{
              toast.error(data.message)
            }
        }else{
          const {data}= await axios.post(backendUrl+'/api/user/login',{password,email})
            if(data.success){
              localStorage.setItem('token',data.token)
              setToken(data.token)
            }else{
              toast.error(data.message)
            }
        }
        
      } catch (error) {
        toast.error(error.message)
      }
  }

  useEffect(()=>{
    if(token){
      navigate('/')
    }
  },[token])

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='border shadow-lg min-w-[340px] sm:min-w-96 flex flex-col rounded-lg p-5 m-auto'>
      <p className='text-2xl md:text-3xl text-gray-600  font-semibold'>
        {state === 'Sign Up'? 'Create Account': "Login In"}
      </p>
      <p className='text-md text-gray-600 py-3'>Please {state === 'Sign Up'? 'Sign Up': "Login In"} to book Appoinment</p>

      <div>
      {
        state==='Sign Up' && <div>
        <p className='text-md text-gray-600 font-semibold py-3'>Full Name</p>
        <input type="text" onChange={(e)=>setName(e.target.value)} value={name} className='border border-zinc-300 rounded-lg w-full p-2 m-1' required/>
      </div>
      }
      
      <div>
        <p className='text-md text-gray-600 font-semibold py-3'>Email</p>
        <input type="email" onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-zinc-300 rounded-lg w-full p-2 m-1' required/>
      </div>
      <div>
        <p className='text-md text-gray-600 font-semibold py-3'>Password</p>
        <input type="password" onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-zinc-300 rounded-lg w-full p-2 m-1' required/>
      </div>

      <button type='submit' className='border my-2 bg-primary p-3 w-full text-white rounded-lg text-lg hover:scale-105 transition-all cursor-pointer duration-100'>{state === 'Sign Up'? 'Create Account': "Login In"}</button>

      {
        state==='Sign Up'?<p className='text-md text-gray-600 '>Already have an account? <span onClick={()=>setState('Log In')} className='text-primary cursor-pointer underline'>Login here</span></p>:<p className='text-md text-gray-600 '>Create a new account? <span onClick={()=>setState('Sign Up')} className='text-primary cursor-pointer underline'>Click here</span></p>
      }
      </div>
      </div>
    </form>
  )
}
