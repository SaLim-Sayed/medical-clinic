import React from "react";
import Logo from "./Logo.png";
import { adminMenu, userMenu } from "../Data";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsBellFill, BsHouse, BsPersonFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { userSelect } from "../app/redux/features/userSlice";
import { FaHandHoldingMedical, FaSignOutAlt } from "react-icons/fa";
import { message,   Badge } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector(userSelect);
   // =========== doctor menu ===============
   const doctorMenu = [
    {
      name: "Home",
      path: "/",
      icon: <BsHouse  className=" size-6" />,
    },
    {
      name: "Appointments",
      path: "/doctor-appointments",
      icon: <FaHandHoldingMedical className=" size-6" /> ,
    },
  
    {
      name: "Profile",
      path: `/doctor/profile/${user?._id}`,
      icon: <BsPersonFill className=" size-6" />,
    },
  ];
  // =========== doctor menu ===============

  // redering menu list
  const SidebarMenu = user?.isAdmin
    ? adminMenu
    : user?.isDoctor
    ? doctorMenu
    : userMenu;
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    message.success("Logout successfully");
    navigate("/login");
  };
  return (
    <>
      <div className="p-4 h-screen">
        <div className="flex">
          <div className=" min-h-[100%]  p-2 w-[300px] bg-red-950  shadow-gray-500 mr-5 text-white rounded-lg">
            <div className="border-b border-red-700">
              <img
                alt="Remy Sharp"
                className=" size-32 mx-auto bg-white fill-slate-500"
                src={Logo}
              />
            </div>
            <div className="mt-12">
              <ul className=" flex flex-col gap-4  navbar">
                {SidebarMenu.map((item) => {
                  return (
                    <NavLink
                      key={item.name}
                      className=" flex gap-2 items-center  "
                      to={item.path}
                    >
                      {item.icon} {item.name}
                    </NavLink>
                  );
                })}
                <button
                  className="  flex items-center  gap-2"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt className=" size-6" /> Logout
                </button>
              </ul>
            </div>
          </div>
          <div className="w-full h-full">
            <div className="mb-5 p-2 h-[10vh] shadow-lg bg-white border ">
              <div className="flex items-center justify-end h-[50px]  gap-2">
                <Link to={"/notification"}>
                  {" "}
                  <Badge
                    count={user?.notifcation.length}
                    className=" cursor-pointer"
                  >
                    <BsBellFill className="text-[1.2rem] " />
                  </Badge>{" "}
                </Link>
                <Link
                  className=" text-indigo-600 text-[1.2rem]  uppercase mx-2"
                  to="/profile"
                >
                  {user?.name}
                </Link>
              </div>
            </div>
            <div className="mb-5 p-2 border min-h-[80vh] shadow-lg bg-white  ">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
