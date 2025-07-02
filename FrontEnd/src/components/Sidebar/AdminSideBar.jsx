import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/logo2.png";
import report from "../../assets/report.png";
import selected_report from "../../assets/selected_report.png";
import room from "../../assets/room.png";
import selected_room from "../../assets/selected_room.png";
import users from "../../assets/users.png";
import selected_users from "../../assets/selected_users.png";
import fine from "../../assets/fine.png";
import selected_fine from "../../assets/selected_fine.png";
import notice from "../../assets/bell-plus.png";
import selected_notice from "../../assets/bell-plus_selected.png";
import home from "../../assets/home.png";
import selected_home from "../../assets/selected_home.png";
import addStudent from "../../assets/user-plus.png";
import selected_addStudent from "../../assets/user-plus_selected.png";
import logout from "../../assets/logout.png";
import adminuser from "../../assets/adminuser.png";
import { FaRegUserCircle } from "react-icons/fa";
import { UserContext } from "../../../contexts/UserContext";
import { CircleUserRound } from "lucide-react";

const AdminSideBar = () => {
  const [open, setOpen] = useState(true);
  const { setUser } = useContext(UserContext);
  const [selectedItem, setSelectedItem] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    // Retrieve the selected item from localStorage
    const url = location.pathname;
    const words = url.split("/"); // Split the URL by '/'
    const lastWord = words[words.length - 1]; // Get the last element from the array
    const storedItem = localStorage.getItem("selectedItem");
    if (storedItem) {
      if (lastWord === "dashboard") {
        setSelectedItem("dashboard");
        localStorage.setItem("selectedItem", "dashboard");
      } else {
        setSelectedItem(storedItem);
      }
    } else {
      setSelectedItem("dashboard");
      localStorage.setItem("selectedItem", "dashboard");
    }
  }, []);

  const handleItemClick = (item) => {
    setSelectedItem(item);
    // Store the selected item in localStorage
    localStorage.setItem("selectedItem", item);
  };

  /* LOGOUT */
  async function logoutHandle(ev) {
    ev.preventDefault();
    await axios.post("/logout");
    setUser(null);
  }

  return (
    <div className="sticky top-0 h-screen mr-4">
      <div
        className={`${
          open ? "w-60" : "w-20"
        } duration-300 h-screen p-5 pt-8 bg-bg_dark_section relative`}
      >
        <div
          className={`absolute cursor-pointer rounded-full -right-3 border-2 top-16 w-7 border-bg_dark_section bg-white text-bg_dark_section ${
            !open && "rotate-180"
          }`}
          onClick={() => setOpen(!open)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </div>
        <div className="flex gap-x-3 items-center ml-1">
          <img
            className={`h-7 border-2 border-bg_white bg-bg_white rounded-2xl duration-500 ${
              open && "rotate-[360deg]"
            }`}
            src={logo}
            alt=""
          />
          <h1
            className={`text-lg cursor-pointer font-semibold text-bg_white_font duration-300 origin-left hover:text-[#D90368] ${
              !open && "hidden"
            }`}
          >
            APC&nbsp;Nadiad
          </h1>
        </div>
        <ul className="pt-10">
          <Link
            to="/admin/dashboard"
            onClick={() => handleItemClick("dashboard")}
            className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
              selectedItem === "dashboard"
                ? "bg-white "
                : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
            }`}
          >
            {selectedItem === "dashboard" ? (
              <img
                className={`h-6 rotate-[360deg] duration-500`}
                src={selected_home}
              />
            ) : (
              <img className="h-6" src={home} />
            )}
            <span
              className={`${!open && "hidden"} origin-left duration-75 ${
                selectedItem === "dashboard"
                  ? "text-bg_dark_section font-semibold"
                  : "text-bg_white"
              }`}
            >
              Dashboard
            </span>
          </Link>
          <Link
            to="/admin/studentInfo"
            onClick={() => handleItemClick("student")}
            className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
              selectedItem === "student"
                ? "bg-white "
                : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
            }`}
          >
            {selectedItem === "student" ? (
              <img
                className={`h-6 rotate-[360deg] duration-500`}
                src={selected_users}
              />
            ) : (
              <img className="h-6" src={users} />
            )}
            <span
              className={`${!open && "hidden"} origin-left duration-75 ${
                selectedItem === "student"
                  ? "text-bg_dark_section font-semibold"
                  : "text-bg_white"
              }`}
            >
              Student&nbsp;Profile
            </span>
          </Link>
          <Link
            to={"/admin/add-student"}
            onClick={() => handleItemClick("addStudent")}
            className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
              selectedItem === "addStudent"
                ? "bg-white "
                : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
            }`}
          >
            {selectedItem === "addStudent" ? (
              <img
                className={`h-6 rotate-[360deg] duration-500`}
                src={selected_addStudent}
              />
            ) : (
              <img className="h-6" src={addStudent} />
            )}
            <span
              className={`${!open && "hidden"} origin-left duration-75 ${
                selectedItem === "addStudent"
                  ? "text-bg_dark_section font-semibold"
                  : "text-bg_white"
              }`}
            >
              Add&nbsp;Student
            </span>
          </Link>
          <Link
            to={"/admin/allocate-blocks"}
            onClick={() => handleItemClick("roomAllocation")}
            className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
              selectedItem === "roomAllocation"
                ? "bg-white duration-200"
                : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
            }`}
          >
            {selectedItem === "roomAllocation" ? (
              <img
                className={`h-6 rotate-[360deg] duration-500`}
                src={selected_room}
              />
            ) : (
              <img className="h-6" src={room} />
            )}
            <span
              className={`${!open && "hidden"} origin-left duration-75 ${
                selectedItem === "roomAllocation"
                  ? "text-bg_dark_section font-semibold"
                  : "text-bg_white"
              }`}
            >
              Room&nbsp;allocation
            </span>
          </Link>
          <Link
            to={"/admin/leave"}
            onClick={() => handleItemClick("leave")}
            className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
              selectedItem === "leave"
                ? "bg-white duration-200"
                : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
            }`}
          >
            {selectedItem === "leave" ? (
              <div className="text-2xl rotate-[360deg] duration-500 text-[#2b2d42] font-medium ml-1.5 mr-2">
                L
              </div>
            ) : (
              <div className="text-2xl font-medium ml-1.5 mr-2">L</div>
            )}
            <span
              className={`${!open && "hidden"} origin-left duration-75 ${
                selectedItem === "leave"
                  ? "text-bg_dark_section font-semibold"
                  : "text-bg_white"
              }`}
            >
              Leave
            </span>
          </Link>
          <li
            onClick={() => handleItemClick("fine")}
            className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
              selectedItem === "fine"
                ? "bg-white "
                : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
            }`}
          >
            {selectedItem === "fine" ? (
              <img
                className={`h-6 rotate-[360deg] duration-500`}
                src={selected_fine}
              />
            ) : (
              <img className="h-6" src={fine} />
            )}
            <span
              className={`${!open && "hidden"} origin-left duration-75 ${
                selectedItem === "fine"
                  ? "text-bg_dark_section font-semibold"
                  : "text-bg_white"
              }`}
            >
              Fine
            </span>
          </li>
          <Link
            to={"/admin/report"}
            onClick={() => handleItemClick("report")}
            className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
              selectedItem === "report"
                ? "bg-white "
                : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
            }`}
          >
            {selectedItem === "report" ? (
              <img
                className={`h-6 rotate-[360deg] duration-500`}
                src={selected_report}
              />
            ) : (
              <img className="h-6" src={report} />
            )}
            <span
              className={`${!open && "hidden"} origin-left duration-75 ${
                selectedItem === "report"
                  ? "text-bg_dark_section font-semibold"
                  : "text-bg_white"
              }`}
            >
              Report
            </span>
          </Link>
          <li
            onClick={logoutHandle}
            className="text-white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75 rounded-md"
          >
            <img className="h-6" src={logout} />
            <span className={`${!open && "hidden"} origin-left duration-500`}>
              Log&nbsp;out
            </span>
          </li>
          <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-1.5 mt-10  rounded-md">
            <img className="h-6" src={adminuser} />
            <span
              className={`${
                !open && "hidden"
              } origin-left transition-all duration-500 user_text font-semibold text-xl `}
            >
              Admin
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
