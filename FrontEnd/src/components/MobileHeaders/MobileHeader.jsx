import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import ManagerMobileHeader from "./ManagerMobileHeader";
import AdminHeader from "./AdminHeader";
import StudentMobileHeader from "./StudentMobileHeader";
import AccountantMobileHeader from "./AccountantMobileHeader";

function SideBar() {
  const { user } = useContext(UserContext);
  return (
    <>
      {user && user.role === "Manager" && <ManagerMobileHeader />}
      {user && user.role === "Admin" && <AdminHeader />}
      {user && user.role === "Student" && <StudentMobileHeader />}
      {user && user.role === "Accountant" && <AccountantMobileHeader />}
    </>
  );
}

export default SideBar;
