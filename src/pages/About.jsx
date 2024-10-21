import React from 'react'
import {assets} from '../assets/assets'
function About() {
  return (
    <div>
    <h1 className='text-2xl md:text-3xl text-gray-600 text-center font-semibold'>ABOUT <span className='text-gray-900'>US</span></h1>
      <div className='flex flex-col md:flex-row my-10 gap-3'>
        
          <img className='w-[40%] rounded-lg' src={assets.about_image} alt="" />
      
        <div className='flex flex-col border border-gray-600 rounded-3xl p-5'>
          <p className='text-gray-800  text-md p-2'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi nulla doloremque iste aperiam dolorem! Beatae earum debitis soluta eaque veritatis nisi ea sapiente non enim nam vel eveniet laudantium at consectetur corrupti itaque dolorem consequatur consequuntur, assumenda dolor. Dolorem, quidem?</p>
          <p className='text-gray-800 text-md p-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quod, cum illum asperiores, ad fugit dicta aspernatur animi atque recusandae earum magni eligendi, repudiandae incidunt? Amet repellendus quaerat debitis accusamus adipisci.</p>
          <b className='text-gray-800 text-lg p-2'>Our Vision</b>
          <p className='text-gray-900  text-md p-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et modi sapiente facilis delectus recusandae praesentium, enim, at eaque, laudantium dolores beatae repellendus explicabo dicta blanditiis ullam placeat! Dolorem, soluta vitae!
          </p>
          <p className='text-gray-900  text-md p-2'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Et modi sapiente facilis delectus recusandae praesentium, enim, at eaque, laudantium dolores beatae repellendus explicabo dicta blanditiis ullam placeat! Dolorem, soluta vitae!
          </p>
        </div>
      </div>
    <h1 className='text-2xl md:text-3xl text-gray-600 text-center font-semibold'>Why Choose US??</h1>
      <div className='flex flex-col md:flex-row justify-center items-center my-5'>
      <div className='border border-gray-700 p-10 hover:bg-primary hover:text-white transition-all duration-500'>
        <p className='font-bold text-xl py-4'>Efficiency</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, illum.</p>
      </div>
      <div className='border border-gray-700 p-10 hover:bg-primary hover:text-white transition-all duration-500'>
        <p className=' font-bold text-xl py-4'>Convenience</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, illum.</p>
      </div>
      <div className='border border-gray-700 p-10 hover:bg-primary hover:text-white transition-all duration-500'>
        <p className=' font-bold text-xl py-4'>Personalization</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat, illum.</p>
      </div>
      </div>
    </div>
  )
}

export default About
