import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";

import logo from "../../assets/logo2.png";
import report from "../../assets/report.png";
import selected_report from "../../assets/selected_report.png";
import notice from "../../assets/bell-plus.png";
import selected_notice from "../../assets/bell-plus_selected.png";
import home from "../../assets/home.png";
import selected_home from "../../assets/selected_home.png";
import logout from "../../assets/logout.png";
import selected_fees from "../../assets/selected_fees.png";
import fees from "../../assets/fees.png";
import down from "../../assets/down.png";
import selected_down from "../../assets/selected_down.png";
import manager from "../../assets/manager.png";
import { UserContext } from "../../../contexts/UserContext";

const AdminSideBar = () => {
  const [open, setOpen] = useState(false);
  const { setUser } = useContext(UserContext);
  const [selectedItem, setSelectedItem] = useState("home");
  const [subFeeSelectedItem, setSubFeeSelectedItem] = useState("");
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
    <div className="sticky top-0 h-screen">
      <div
        className={`w-60 duration-300 h-screen p-5 pt-8 bg-bg_dark_section relative`}
      >
        <div className="flex gap-x-3 items-center ml-1">
          <img
            className={`h-7 border-2 border-bg_white bg-bg_white rounded-2xl duration-500 `}
            src={logo}
            alt=""
          />
          <h1
            className={`text-lg cursor-pointer font-semibold text-bg_white_font duration-300 origin-left hover:text-[#D90368]`}
          >
            APC&nbsp;Nadiad
          </h1>
        </div>
        <ul className="pt-10">
          <Link
            to="/accountant/dashboard"
            onClick={() => {
              handleItemClick("dashboard");
              setSubFeeSelectedItem("");
            }}
            className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
              selectedItem === "dashboard"
                ? "bg-white "
                : "hover:bg-white hover:bg-opacity-20 transition-all duration-75"
            }`}
          >
            {selectedItem === "dashboard" ? (
              <img className={`h-6`} src={selected_home} />
            ) : (
              <img className="h-6" src={home} />
            )}
            <span
              className={`origin-left duration-75 ${
                selectedItem === "dashboard"
                  ? "text-bg_dark_section font-semibold"
                  : "text-bg_white"
              }`}
            >
              Dashboard
            </span>
          </Link>
          <li
            onClick={() => {
              handleItemClick("fees");
              setOpen((prev) => !prev);
            }}
            className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
              selectedItem === "fees"
                ? "bg-white "
                : "hover:bg-white hover:bg-opacity-20 transition-all duration-75"
            }`}
          >
            {selectedItem === "fees" ? (
              <img className={`h-6 `} src={selected_fees} />
            ) : (
              <img className="h-6" src={fees} />
            )}
            <span
              className={` origin-left duration-75 ${
                selectedItem === "fees"
                  ? "text-bg_dark_section font-semibold"
                  : "text-bg_white"
              }`}
            >
              Fee
            </span>
            {selectedItem === "fees" ? (
              <img className={`h-6 ml-20`} src={selected_down} />
            ) : (
              <img className="h-6 ml-20" src={down} />
            )}
          </li>
          <div
            className={`text-white text-sm ml-10 mb-3 ${
              open ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col gap-4">
              <Link
                onClick={() => {
                  handleItemClick("fees");
                  setSubFeeSelectedItem("collectFee");
                }}
                to="/accountant/fee/collectFees"
                className={`p-2 duration-300 hover:underline hover:cursor-pointer ${
                  subFeeSelectedItem === "collectFee"
                    ? "text-[#D90368]"
                    : "text-white"
                }`}
              >
                Collect Fees
              </Link>
              <Link
                onClick={() => {
                  handleItemClick("fees");
                  setSubFeeSelectedItem("dueFees");
                }}
                to="/accountant/fee/dueFees"
                className={`p-2 duration-300 hover:underline hover:cursor-pointer ${
                  subFeeSelectedItem === "dueFees"
                    ? "text-[#D90368]"
                    : "text-white"
                }`}
              >
                Due Fees
              </Link>
              <Link
                onClick={() => {
                  handleItemClick("fees");
                  setSubFeeSelectedItem("addFee");
                }}
                to="/accountant/fee/addFee"
                className={`p-2 duration-300 hover:underline hover:cursor-pointer ${
                  subFeeSelectedItem === "addFee"
                    ? "text-[#D90368]"
                    : "text-white"
                }`}
              >
                Add Fee
              </Link>
            </ul>
          </div>
          <Link
            to={"/accountant/report"}
            onClick={() => {
              handleItemClick("report");
              setSubFeeSelectedItem("");
            }}
            className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md ${
              selectedItem === "report"
                ? "bg-white "
                : "hover:bg-white hover:bg-opacity-20 transition-all duration-75"
            }`}
          >
            {selectedItem === "report" ? (
              <img className={`h-6`} src={selected_report} />
            ) : (
              <img className="h-6" src={report} />
            )}
            <span
              className={` origin-left duration-75 ${
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
            className="text-white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 hover:bg-white hover:bg-opacity-20 transition-all duration-75 rounded-md"
          >
            <img className="h-6" src={logout} />
            <span className={` origin-left duration-500`}>Log&nbsp;out</span>
          </li>
          <li className="text-white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-1.5 mt-10  rounded-md">
            <img className="h-6" src={manager} />
            <span
              className={` origin-left transition-all duration-500 user_text font-semibold text-lg `}
            >
              Accountant
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminSideBar;
