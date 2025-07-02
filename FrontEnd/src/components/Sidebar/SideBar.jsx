import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import AdminSidebar from "./AdminSideBar";
import StudentSidebar from "./StudentSidebar";
import ManagerSidebar from "./ManagerSidebar";
import AccountantSidebar from "./AccountantSidebar";

function SideBar() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && user.role === "Manager" && <ManagerSidebar />}
      {user && user.role === "Admin" && <AdminSidebar />}
      {user && user.role === "Accountant" && <AccountantSidebar />}
      {user && user.role === "Student" && <StudentSidebar />}
    </>
  );
}

export default SideBar;
