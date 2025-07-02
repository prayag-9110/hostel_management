import React from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import DueFeeCard from "@/components/Fees/DueFeeCard";
import DueFeeTable from "@/components/Fees/DueFeeTable";

function DueFees() {
  const { user, setUser } = useContext(UserContext);

  if (!user || (user && user.role !== "Accountant")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-8">
      <DueFeeCard />
      <DueFeeTable />
    </div>
  );
}

export default DueFees;
