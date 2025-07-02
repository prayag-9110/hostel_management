import { React, useContext } from "react";
import { Link, Navigate } from "react-router-dom";
import SideBar from "../../components/Sidebar/SideBar";
import { UserContext } from "../../../contexts/UserContext";

function ManagerDashboard() {
  const { user, setUser } = useContext(UserContext);

  if (!user || (user && user.role !== "Manager")) {
    return <Navigate to="/login" />;
  }

  return <div>ManagerDashboard</div>;
}

export default ManagerDashboard;
