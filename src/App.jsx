
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import Login from './pages/Login'
import MyAppoinment from './pages/MyAppoinment'
import MyProfile from './pages/MyProfile'
import Doctors from './pages/Doctors'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Appoinment from './pages/Appoinment'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <div className='mx-4 sm:mx-[10%]'>
    <ToastContainer/>
    <Navbar/>
    
     <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/appoinment' element={<Appoinment/>}/>
      <Route path='/myappoinment/:docId' element={<MyAppoinment/>}/>
       <Route path='/myprofile' element={<MyProfile/>}/>
      <Route path='/doctors' element={<Doctors/>}/>
      <Route path='/doctors/:speciality' element={<Doctors/>}/>
     </Routes>
     <Footer/>
    </div>
  )
}
export default App
