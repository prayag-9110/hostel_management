import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../../../../contexts/UserContext";
import { useReportContext } from "../../../../contexts/ReportContext";

import StudentViewPopUp from "./StudentViewPopUp";
import Loader from "../../../components/Loader";
import StudentAddReportPopUp from "./StudentAddReportPopUp";

function StudentReport() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { reportChanged } = useReportContext();

  useEffect(
    () => {
      axios.get("report/get-report").then((res) => {
        const sortedReports = res.data.sort((a, b) => {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });
        setReports(sortedReports);
        setLoading(false);
      });
    },
    [reportChanged],
    []
  );

  if (!user || (user && user.role !== "Student")) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="h-[90vh] md:h-auto containerX">
        <div className="flex justify-center text-2xl font-bold labels mx-4 mt-6">
          All Reports
        </div>
        <StudentAddReportPopUp />
        <div className="flex flex-col mx-2">
          <div className="grid grid-cols-3 md:grid-cols-9 bg-gray-200 border border-gray-300 mx-6 cursor-pointe p-1.5 rounded-t-lg">
            <div></div>
            <div className="">Receiver</div>
            <div className="hidden md:block truncate col-span-2 text-center">
              Title
            </div>
            <div className="hidden md:block truncate col-span-3 text-center">
              Description
            </div>
            <div className="text-center md:col-span-2">Date</div>
          </div>
          {reports.length > 0 &&
            reports.map((report) => <StudentViewPopUp report={report} />)}
        </div>
      </div>
    </>
  );
}

export default StudentReport;
