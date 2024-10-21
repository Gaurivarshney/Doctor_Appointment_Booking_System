import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
import axios from 'axios'
import { toast } from "react-toastify";

export default function Appoinment() {
  const {userData, setUserdata,token, backendUrl, loadUserProfileData  }= useContext(AppContext)
  console.log(userData)
  const [isEdit, setEdit] = useState(false);
  const [image, setImg]= useState(false)


  const updateUserProfileData= async()=>{
      try {
        const formData = new FormData()
        formData.append('name',userData.name)
        formData.append('phone',userData.phone)
        formData.append('address', JSON.stringify(userData.address))
        formData.append('gender',userData.gender)
        formData.append('dob',userData.dob)

        image && formData.append('image',image)

        const {data }= await axios.post(backendUrl+'/api/user/update-profile', formData, {headers: {token}})
          if(data.success){
            toast.success(data.message)
            await loadUserProfileData()
            setEdit(false)
            setImg(false)
          }else{
            toast.error(data.message)
          }

      } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
  }
  return userData &&(
    <div>
    {
      isEdit? <label htmlFor="image">
        <div className="inline-block relative cursor-pointer">
          <img className="w-36 rounded opacity-75" src={image? URL.createObjectURL(image): userData.image} alt="" />
          <img className="w-10 absolute bottom-12 right-12" src={image? '': assets.upload_icon} alt="" />
        </div>
        <input onChange={(e)=>setImg(e.target.files[0])} type="file" id="image" hidden/>
      </label>:

      <img className="max-w-40" src={userData.image} alt="" />
    }
      <p className="text-2xl py-2  text-gray-500 font-bold">
        {isEdit ? (
          <input
            type="text"
            value={userData.name}
            onChange={(e) =>
              setUserdata((prev) => ({ ...prev, name: e.target.value }))
            }
          />
        ) : (
          <p>{userData.name}</p>
        )}
      </p>
      <hr className="w-60" />
      <p className="text-xl  text-gray-900 font-semibold">Contact Info</p>
      <div className="grid grid-cols-[1fr_5fr] gap-y-2.5 mt-3 text-neutral-700">
        <p>Email:</p>
        <p className="text-primary underline">{userData.email}</p>

        <p>Phone:</p>
        {isEdit ? (
          <input
            type="number"
            value={userData.phone}
            onChange={(e) =>
              setUserdata((prev) => ({ ...prev, phone: e.target.value }))
            }
          />
        ) : (
          <p className="text-primary">{userData.phone}</p>
        )}

        <p>Address:</p>
        {isEdit ? (
          <p>
            <input
              type="text"
              value={userData.line1}
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, Line1: e.target.value }))
              }
              className="border border-zinc-600 mb-2 rounded"
            /> <br />
            <input
              type="text"
              value={userData.line2}
              onChange={(e) =>
                setUserdata((prev) => ({ ...prev, Line2: e.target.value }))
              }
              className="border border-zinc-600 rounded"
            />
          </p>
        ) : (
          <p>
            {userData.line1} <br /> {userData.line2}
          </p>
        )}
      </div>
      <p className="text-xl  text-gray-900 font-semibold py-1">Basic Info</p>
      <hr className="w-60" />
      <div className="grid grid-cols-[1fr_5fr] gap-y-2.5 mt-3 taxt-neutral-700">
        <p>Gender: </p>
        {isEdit ? (
          <select className="max-w-40">
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        ) : (
          <p>{userData.gender}</p>
        )}

        <p>DOB:</p>
        {isEdit ? (
          <input
            className="max-w-40"
            type="date"
            onChange={(e) =>
              setUserdata((prev) => ({ ...prev, Dob: e.target.value }))
            }
          />
        ) : (
          <p>{userData.dob}</p>
        )}
      </div>
      <div className="border rounded-full max-w-[150px] cursor-pointer text-center text-gray-900 border-zinc-900 font-medium text-lg my-3 p-4 hover:scale-105 transition-all duration-100">
        {isEdit ? (
          <button onClick={updateUserProfileData}>Save Info</button>
        ) : (
          <button onClick={() => setEdit(true)}>Edit</button>
        )}
      </div>
    </div>
  );
}
