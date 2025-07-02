import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo2.png";
import axios from "axios";
import { useContext } from "react";

import food from "../../assets/food.png";
import selected_food from "../../assets/selected_food.png";
import home from "../../assets/home.png";
import selected_home from "../../assets/selected_home.png";
import report from "../../assets/report.png";
import selected_report from "../../assets/selected_report.png";
import food_menu from "../../assets/food_menu.png";
import selected_food_menu from "../../assets/selected_food_menu.png";
import notice from "../../assets/notice.png";
import selected_notice from "../../assets/selected_notice.png";
import logout from "../../assets/logout.png";
import manager from "../../assets/manager.png";
import { UserContext } from "../../../contexts/UserContext";

const ManagerSidebar = () => {
  const [open, setOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState("home");

  const { user, setUser } = useContext(UserContext);
  const location = useLocation();

  useEffect(() => {
    // Retrieve the selected item from localStorage
    const url = location.pathname;
    const words = url.split("/"); // Split the URL by '/'
    const lastWord = words[words.length - 1]; // Get the last element from the array
    const storedItem = localStorage.getItem("selectedItem");
    if (storedItem) {
      if (lastWord === "home") {
        setSelectedItem("home");
        localStorage.setItem("selectedItem", "home");
      } else {
        setSelectedItem(storedItem);
      }
    } else {
      setSelectedItem("home");
      localStorage.setItem("selectedItem", "home");
    }
  }, []);

  useEffect(() => {
    // Retrieve the selected item from localStorage
    const storedItem = localStorage.getItem("selectedItem");
    if (storedItem) {
      setSelectedItem(storedItem);
    } else {
      setSelectedItem("home");
      localStorage.setItem("selectedItem", "home");
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
    <>
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
          <div className="flex gap-x-3 items-center ml-2 cursor-pointer">
            <img
              className={`h-7 border-2 border-bg_white bg-bg_white rounded-xl duration-500 ${
                open && "rotate-[360deg]"
              }`}
              src={logo}
              alt=""
            />
            <h1
              className={`text-lg font-semibold text-bg_white_font duration-300 origin-left hover:text-[#D90368] ${
                !open && "hidden"
              }`}
            >
              APC&nbsp;Nadiad
            </h1>
          </div>
          <ul className="pt-10">
            <Link
              to="/manager/dashboard"
              onClick={() => handleItemClick("home")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "home"
                  ? "bg-white duration-200"
                  : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
              }`}
            >
              {selectedItem === "home" ? (
                <img
                  className={`h-6 rotate-[360deg] duration-500`}
                  src={selected_home}
                />
              ) : (
                <img className="h-6" src={home} />
              )}
              <span
                className={`${!open && "hidden"} origin-left duration-75 ${
                  selectedItem === "home"
                    ? "text-bg_dark_section font-semibold"
                    : "text-bg_white"
                }`}
              >
                Dashboard
              </span>
            </Link>

            <Link
              to="/manager/allfoods"
              onClick={() => handleItemClick("foodMenu")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "foodMenu"
                  ? "bg-white duration-200"
                  : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
              }`}
            >
              {selectedItem === "foodMenu" ? (
                <img
                  className={`h-6 rotate-[360deg] duration-500`}
                  src={selected_food_menu}
                />
              ) : (
                <img className="h-6" src={food_menu} />
              )}
              <span
                className={`${!open && "hidden"} origin-left duration-75 ${
                  selectedItem === "foodMenu"
                    ? "text-bg_dark_section font-semibold"
                    : "text-bg_white"
                }`}
              >
                Food&nbsp;Menu
              </span>
            </Link>
            <Link
              to="/manager/addmeal"
              onClick={() => handleItemClick("todayMeal")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "todayMeal"
                  ? "bg-white duration-200"
                  : "hover:bg-white hover:bg-opacity-20 hover:scale-95 transition-all duration-75"
              }`}
            >
              {selectedItem === "todayMeal" ? (
                <img
                  className={`h-6 rotate-[360deg] duration-500`}
                  src={selected_food}
                />
              ) : (
                <img className="h-6" src={food} />
              )}
              <span
                className={`${!open && "hidden"} origin-left duration-75 ${
                  selectedItem === "todayMeal"
                    ? "text-bg_dark_section font-semibold"
                    : "text-bg_white"
                }`}
              >
                Today's&nbsp;Meal
              </span>
            </Link>
            <Link
              to={"/manager/report"}
              onClick={() => handleItemClick("report")}
              className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
                selectedItem === "report"
                  ? "bg-white duration-200"
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
            <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer mb-3 mt-10 p-1.5 rounded-md">
              <img className="h-6" src={manager} />
              <span
                className={`${
                  !open && "hidden"
                } origin-left transition-all duration-500 font-semibold text-lg user_text`}
              >
                Manager
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
};

export default ManagerSidebar;
