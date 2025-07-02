import React, { useContext, useState } from "react";
import axios from "axios";

// import * as myConst from "../../myConstants";
import logo from "../../assets/logo2.png";
import { Link } from "react-router-dom";
import { UserContext } from "../../../contexts/UserContext";
import home from "../../assets/home.png";
import report from "../../assets/report.png";
import fine from "../../assets/fine.png";
import logout from "../../assets/logout.png";
import users from "../../assets/users.png";
import notice from "../../assets/bell-plus.png";
import addStudent from "../../assets/user-plus.png";
import room from "../../assets/room.png";
import { FaRegUserCircle } from "react-icons/fa";

function AdminMobileHeader() {
  const { setUser, user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [menuButtonToggel, setMenuButtonToggel] = useState(false);

  async function logoutHandle(ev) {
    ev.preventDefault();
    await axios.post("/logout");
    setUser(null);
  }

  function menuToggel() {
    let list = document.querySelector("ul");
    setOpen((open) => !open);

    // For menu button -> close button
    menuButtonToggel === true
      ? setMenuButtonToggel(false)
      : setMenuButtonToggel(true);
  }

  return (
    <>
      {user && (
        <>
          <nav className="p-4 bg-bg_dark_section shadow">
            <div className="flex justify-between items-center ">
              <div className="flex items-center">
                <span className="text-3xl cursor-pointer block">
                  {menuButtonToggel ? (
                    <span
                      className="text-3xl cursor-pointer block"
                      onClick={menuToggel}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6 text-bg_white_font"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </span>
                  ) : (
                    <>
                      <span
                        className={`text-3xl cursor-pointer md:hidde block`}
                        onClick={menuToggel}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="w-6 h-6 text-bg_white_font"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                          />
                        </svg>
                      </span>
                    </>
                  )}
                  <ion-icon name="menu" onclick="Menu(this)"></ion-icon>
                </span>
                <Link
                  to={"/"}
                  className="flex items-center gap-2 cursor-pointer px-4"
                >
                  <img
                    className="h-6 w-6 border-2 border-bg_white bg-bg_white rounded-full"
                    src={logo}
                    alt=""
                  />
                  <span className="text-lg font-semibold text-bg_white_font">
                    APC Nadiad
                  </span>
                </Link>
              </div>
              <div className="mx-1 text-white flex items-center gap-2">
                <FaRegUserCircle />
                <p className="user_text">Admin</p>
              </div>
            </div>
          </nav>
          {open && (
            <div>
              <ul
                className={`absolute bg-bg_dark_section w-1/2 pl-7 h-screen transition-all ease-in z-10`}
              >
                <li
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 mt-4 rounded-md`}
                >
                  <img className="h-6" src={home} />
                  <span className="text-bg_white">Dashboard</span>
                </li>
                <Link
                  to={"/admin/studentInfo"}
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={users} />
                  <span className="text-bg_white">Student&nbsp;Profile</span>
                </Link>
                <Link
                  to={"/admin/add-student"}
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={addStudent} />
                  <span className="text-bg_white">Add&nbsp;Student</span>
                </Link>
                <Link
                  to={"/admin/allocate-blocks"}
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={room} />
                  <span className="text-bg_white">Room&nbsp;Allocation</span>
                </Link>
                <Link
                  to={"/admin/leave"}
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <div className="text-2xl font-medium ml-1.5 mr-2">L</div>
                  <span className="text-bg_white">Leave</span>
                </Link>
                <li
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={fine} />
                  <span className="text-bg_white">Fine</span>
                </li>
                <Link
                  to={"/admin/report"}
                  onClick={menuToggel}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={report} />
                  <span className="text-bg_white">Report</span>
                </Link>

                <li
                  onClick={logoutHandle}
                  className={`text-bg_white text-sm flex items-center gap-x-4 cursor-pointer mb-3 p-2 rounded-md`}
                >
                  <img className="h-6" src={logout} />
                  <span className={`origin-left underline`}>Log&nbsp;out</span>
                </li>
              </ul>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default AdminMobileHeader;
