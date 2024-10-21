import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { NavLink, useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext';
export default function Navbar() {
    const navigate = useNavigate();
    const [showMenu, setShowMenu]= useState(false)
    const {token, setToken, userData}= useContext(AppContext)

    const logout=()=>{
      setToken(false)
      localStorage.removeItem('token')
    
    }

  return (
    <div className='flex text-center justify-between py-4 mb-5 border-b border-b-gray-400 text-sm z-30' >
      <img onClick={()=>navigate('/')} className='w-44 cursor-pointer' src={assets.logo} alt="loading" />
      <ul className='hidden md:flex items-start gap-5 font-medium text-lg '>
        <NavLink to='/'>
            <li className='py-1'>Home</li>
            <hr className='border-none outline-none bg-primary h-0.5 w.3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/doctors'>
            <li className='py-1'>All Doctors</li>
            <hr className='border-none outline-none bg-primary h-0.5 w.3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/about'>
            <li className='py-1'>About</li>
            <hr className='border-none outline-none bg-primary h-0.5 w.3/5 m-auto hidden'/>
        </NavLink>
        <NavLink to='/contact'>
            <li className='py-1'>Contact</li>
            <hr className='border-none outline-none bg-primary h-0.5 w.3/5 m-auto hidden'/>
        </NavLink>
      </ul>
      <div className='flex items-center gap-4'>
      {
        token && userData
        ? <div className='flex items-center gap-2 cursor-pointer group relative '>
            <img className='w-10 rounded-full' src={userData.image} alt="" />
            <img className='w-4' src={assets.dropdown_icon} alt="" />
            <div className='absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'>
                <div className='min-w-48 bg-stone-100 gap-4 p-4 flex flex-col items-start'>
                    <p onClick={()=>navigate('myprofile')} className='hover:text-black cursor-pointer'>My Profile</p>
                    <p onClick={()=>navigate('appoinment')}  className='hover:text-black cursor-pointer'>My Appoinments</p>
                    <p onClick={logout} className='hover:text-black cursor-pointer'>LogOut</p>
                </div>
            </div>
        </div>
        : <button onClick={()=>navigate('/login')} className='bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block'>
          <p className='font-semibold text-xl'>Create Account</p>
        </button>
      }
      <img onClick={()=>{
        setShowMenu(true)
      }} className='w-6 md:hidden cursor-pointer' src={assets.menu_icon} alt="" />
      <div className={` ${showMenu? 'fixed w-full': 'h-0 w-0 ' } md:hidden right-0 top-0 bottom-0 bg-white text-gray-900 text-lg font-semibold`}>
        <div className='flex flex-row justify-between m-5 '>
          <img className='w-[150px]' src={assets.logo} alt="" /><img onClick={()=>setShowMenu(false)} className='w-10 cursor-pointer transition-all duration-100' src={assets.cross_icon} alt="" />
        </div>
        <div className='mt-10'>
          <ul className='flex flex-col gap-y-4 text-xl'>
            <NavLink to={'/'}  onClick={()=>setShowMenu(flase)} ><p  className=' cursor-pointer border border-zinc-700 p-2 mx-4 rounded-md shadow-md hover:bg-blue-200 scale-105 transition-all duration-100'>HOME</p></NavLink>
            <NavLink to={'/about'} onClick={()=>setShowMenu(flase)}   ><p className=  'border border-zinc-700 p-2 mx-4 cursor-pointer rounded-md shadow-md hover:bg-blue-200 scale-105 transition-all duration-100'>ABOUT</p></NavLink>
            <NavLink to={'/doctors'}  onClick={()=>setShowMenu(flase)} ><p  className=' cursor-pointer border border-zinc-700 p-2 mx-4 rounded-md shadow-md hover:bg-blue-200 scale-105 transition-all duration-100'>ALL DOCTORS</p></NavLink>
            <NavLink to={'/contact'}  onClick={()=>setShowMenu(flase)} ><p  className=' cursor-pointer border border-zinc-700 p-2 mx-4 rounded-md shadow-md hover:bg-blue-200 scale-105 transition-all duration-100'>CONTACT US</p></NavLink>
          </ul>
        </div>
      </div>
      </div>
    </div>

  )
}
