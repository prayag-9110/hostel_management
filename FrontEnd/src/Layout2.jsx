import { Outlet } from "react-router-dom";
import React, { useContext, useState, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../contexts/UserContext";
import Loader from "./components/Loader";
import Header from "./components/Header";
import { motion, useScroll } from "framer-motion";

function Layout2() {
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(true);
  const { scrollYProgress } = useScroll();

  return (
    <>
      <div className="landing_background h-full">
        <Header />
        <div>
          <Outlet />
        </div>
      </div>
    </>
  );
}

export default Layout2;
