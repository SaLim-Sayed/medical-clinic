import {
  FaHandHoldingMedical,
  FaHome,
  FaHospitalUser,
  FaUser,
  FaUserAlt,
} from "react-icons/fa";
import { BsHospital, BsHouse, BsPersonFill } from "react-icons/bs";
export const userMenu = [
  {
    name: "Home",
    path: "/",
    icon: <FaHome className=" size-6" />,
  },
  {
    name: "Appointments",
    path: "/appointments",
    icon: <FaHandHoldingMedical className=" size-6" />,
  },
  {
    name: "Apply Doctor",
    path: "/apply-doctor",
    icon: <BsHospital className=" size-6" />,
  },
  {
    name: "Profile",
    path: "/profile",
    icon: <FaUser className=" size-6" />,
  },
];

// admin menu
export const adminMenu = [
  {
    name: "Home",
    path: "/",
    icon: <BsHouse  className=" size-6" />,
  },

  {
    name: "Doctors",
    path: "/admin/doctors",
    icon: <FaHospitalUser  className=" size-6" />,
  },
  {
    name: "Users",
    path: "/admin/users",
    icon: <FaUserAlt  className=" size-6" />,
  },

  {
    name: "Profile",
    path: "/profile",
    icon: <BsPersonFill className=" size-6" />,
  },
  
];


 