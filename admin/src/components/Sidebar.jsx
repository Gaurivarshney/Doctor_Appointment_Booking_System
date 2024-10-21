import React, { useContext } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";
const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const {dToken}= useContext(DoctorContext)
  return (
    <div className="flex flex-col min-h-screen pt-5 border-r bg-white max-sm:w-16 md:w-72">
      {aToken && (
        <ul className="text-[#515151] font-medium text-lg">
          <NavLink
            className={({ isActive }) =>
              `flex flex-row gap-3 items-center py-3.5 px-3 sm:px-9 min-w-72 ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex flex-row gap-3  items-center py-3.5 px-3 sm:px-9  min-w-72 ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/all-appoinment"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appoinments</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex flex-row gap-3  items-center py-3.5 px-3 sm:px-9  min-w-72 ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex flex-row gap-3 items-center py-3.5 px-3 sm:px-9  min-w-72 ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {dToken && (
        <ul className="text-[#515151] font-medium text-lg">
          <NavLink
            className={({ isActive }) =>
              `flex flex-row gap-3 items-center py-3.5 px-3 sm:px-9  min-w-72 ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>
          <NavLink
            className={({ isActive }) =>
              `flex flex-row gap-3  items-center py-3.5 px-3 sm:px-9  min-w-72 ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/doctor-appoinments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appoinments</p>
          </NavLink>
      
          <NavLink
            className={({ isActive }) =>
              `flex flex-row gap-3 items-center py-3.5 px-3 sm:px-9  min-w-72 ${
                isActive ? "bg-[#F2F3FF] border-r-4 border-primary" : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}
    </div>

  );
};

export default Sidebar;
