import React, { useContext } from 'react'
import { AdminContext } from '../context/AdminContext'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'

const Navbar = () => {
    const {aToken,setAToken}= useContext(AdminContext)
    const {dToken, setDToken}= useContext(DoctorContext)

    const navigate = useNavigate()
    const logout=()=>{
        navigate('/')
        aToken && setAToken('')
        aToken && localStorage.removeItem('aToken')
        dToken && setDToken('')
        dToken && localStorage.removeItem('dToken')
    }
  return (
    <div className='flex items-center justify-between px-5 sm:px-10 py-3 border-b border-gray-600 bg-white  '>
      <div className='flex items-center gap-5 text-sm'>
        <img className='w-36 sm:w-40' src={assets.admin_logo} alt="" />
        <p className='text-gray-600 border border-gray-600 rounded-full px-2  py-1'>{aToken? 'Admin':'Doctor' }</p>
      </div>
        <button onClick={logout} className='bg-primary border px-4 py-2 rounded-full text-white hover:bg-white hover:text-black hover:border-gray-700'>Logout</button>
    </div>
  )
}

export default Navbar
