import { Outlet } from "react-router-dom";
import SideBar from "./components/Sidebar/SideBar";
import React, { useContext, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/UserContext";
import Loader from "./components/Loader";
import MobileHeader from "./components/MobileHeaders/MobileHeader";
import Footer from "./components/LandingPage/Footer";

function Layout() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <div className="md:flex hidden h-full bg-blue-100/60">
        <SideBar />
        <div className="flex-1 justify-center items-center">
          <Outlet />
        </div>
      </div>
      <div className="md:hidden block bg-blue-100/60">
        <MobileHeader />
        <div className="flex-1 justify-center items-center">
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout;
