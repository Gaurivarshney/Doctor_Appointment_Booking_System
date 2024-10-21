import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { DoctorContext } from '../context/DoctorContext';

const Login = () => {
    const [state, setState]= useState('Admin');
    const {setAToken, backendUrl}= useContext(AdminContext);
    const {setDToken}= useContext(DoctorContext)
    const [email, setEmail]=useState('')
    const [password, setPassword]=useState('')
    const onSubmitHandler = async (event) => {
        event.preventDefault();
        try {
            if (state === 'Admin') {
                const { data } = await axios.post(backendUrl+'/api/admin/login', { email, password });
    
                if (data.success) {
                    // Successful login
                    localStorage.setItem('aToken', data.token);
                    setAToken(data.token);
                    toast.success('Login successfully');
                }else{
                    toast.error('Invalid Credentials')
                    console.log(data.message)
                }
            }else{
              const { data } = await axios.post(backendUrl + '/api/doctor/doctor-login', { email, password });
    
              if (data.success) {
                  // Successful login
                  localStorage.setItem('dToken', data.token);
                  setDToken(data.token);
                  console.log(data.token)
              }else{
                  toast.error('Invalid Credentials')
              }
            }
        } catch (error) {
            toast.error(error.message)
        }
    };
    
  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center '>
      <div className='min-w-96 md:w-[300px] m-auto border  rounded-lg flex flex-col p-5 shadow-lg'>
        <p  className='text-3xl text-gray-500 font-semibold'><span className='text-primary text-3xl font-semibold'>{state}</span>Login</p>
        <div className='mt-2 pt-2 text-gray-900 font-medium text-lg'>
            <p>Email: </p>
            <input onChange={(e)=>setEmail(e.target.value)} value={email} className='border border-zinc-500 rounded-md w-full mt-2' type="email" required/>
            <p>Password</p>
            <input onChange={(e)=>setPassword(e.target.value)} value={password} className='border border-zinc-500 rounded-md w-full mt-2' type="password" required />
        </div>
        <button className='mt-4 bg-primary rounded-md w-full p-2 text-white text-xl hover:scale-105 transition-all duration-100'>LogIn</button>
        {
            state=='Admin'? <p className='pt-2'>Doctor Login? <span className='text-primary cursor-pointer underline' onClick={()=>setState('Doctor')}>click here</span></p> : <p className='pt-2'>Doctor Login? <span className='text-primary cursor-pointer underline' onClick={()=>setState('Admin')}>click here</span></p>
        }
      </div>
    </form>
  )
}

export default Login
