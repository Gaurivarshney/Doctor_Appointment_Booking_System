import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Route, Routes } from 'react-router-dom';
import AddDoctor from './pages/admin/AddDoctor';
import AllApoinments from './pages/admin/AllApoinments';
import Dashboard from './pages/admin/Dashboard';
import DoctorList from './pages/admin/DoctorList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/doctor/DoctorDashboard';
import DoctorAppoinments from './pages/doctor/DoctorAppoinments';
import DoctorProfile from './pages/doctor/DoctorProfile';
const App = () => {
  const {aToken}= useContext(AdminContext)
  const {dToken}= useContext(DoctorContext)
  return aToken || dToken ?(
    <div className='bg-[#F8F9FD]'>
      <ToastContainer/>
      <Navbar/>
      <div className='flex items-start'>
        <Sidebar/>
        <Routes>
        {/* Admin Routes */}
          <Route path='/'  element={<></>} />
          <Route path='/add-doctor'  element={<AddDoctor/>} />
          <Route path='/all-appoinment'  element={<AllApoinments/>} />
          <Route path='/dashboard'  element={<Dashboard/>} />
          <Route path='/doctor-list'  element={<DoctorList/>} />
 
      {/* doctor routes */}
          <Route path='/doctor-dashboard'  element={<DoctorDashboard/>} />
          <Route path='/doctor-appoinments'  element={<DoctorAppoinments/>} />
          <Route path='/doctor-profile'  element={<DoctorProfile/>} />


          
        </Routes>
      </div>
    </div>
  ):(
    <>
      <Login/>
      <ToastContainer/>
    </>
  )
}

export default App
