import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../contexts/UserContext";
import { motion, useScroll } from "framer-motion";

import Hero from "@/components/LandingPage/Hero";
import AboutUs from "@/components/LandingPage/AboutUs";
import PhotoGallery from "@/components/LandingPage/PhotoGallery";
import Testimonials from "@/components/LandingPage/Testimonials";
import Room from "@/components/LandingPage/Room";
import FacilitiesAndAmenities from "@/components/LandingPage/FacilitiesAndAmenities";
import Footer from "@/components/LandingPage/Footer";
import { ScrollArea } from "@/components/ui/scroll-area";

function IndexPage() {
  const { user, setUser } = useContext(UserContext);
  const { scrollYProgress } = useScroll();

  if (user) {
    if (user.role == "Student") {
      // console.log(user);
      return <Navigate to="/student/dashboard" />;
    } else if (user.role == "Manager") {
      return <Navigate to="/manager/dashboard" />;
    } else if (user.role == "Accountant") {
      return <Navigate to="/accountant/dashboard" />;
    } else if (user.role == "Admin") {
      return <Navigate to="/admin/dashboard" />;
    }
  }

  return (
    <>
      <ScrollArea>
        <div className="landing_background">
          <motion.div
            className="progress-bar bg-orange-400 z-10"
            style={{
              // position: isSticky ? "fixed" : "relative",
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              width: "100%",
              height: "5px",
              transformOrigin: "0%",
              scaleX: scrollYProgress,
            }}
          ></motion.div>
        </div>
        <div className="px-5 md:px-10 lg:px-20 overflow-x-hidden flex flex-col">
          <Hero />
          <AboutUs />
        </div>
        <PhotoGallery />
        <div className="px-5 md:px-10 lg:px-20 flex flex-col">
          <Testimonials />
        </div>
        {/* <Room />
        <FacilitiesAndAmenities /> */}
        <Footer />
      </ScrollArea>
    </>
  );
}

export default IndexPage;
