import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/UserContext";
import Loader from "../Loader";
import "react-toastify/dist/ReactToastify.css";
import { Navigate } from "react-router-dom";
import ViewPopUp from "./ViewPopUp";
import { useReportContext } from "../../../contexts/ReportContext";

function Report({ role }) {
  const { reportChanged } = useReportContext();
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);

  useEffect(
    () => {
      axios.get("report/get-reports").then((res) => {
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

  if (!user || (user && user.role !== role)) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="flex justify-center mb-6 text-2xl font-bold labels mt-4 mx-4">
        All Reports
      </div>
      <div className="flex flex-col relative mx-2">
        <div className="grid grid-cols-3 md:grid-cols-9 bg-gray-200 border border-gray-300 mx-6 cursor-pointe p-1.5 rounded-t-lg">
          <div></div>
          <div className="">From</div>
          <div className="hidden md:block truncate col-span-2 text-center">
            Title
          </div>
          <div className="hidden md:block truncate col-span-3 text-center">
            Description
          </div>
          <div className="text-center md:col-span-2">Date</div>
        </div>
        {reports.length > 0 &&
          reports.map((report) => <ViewPopUp report={report} />)}
      </div>
    </div>
  );
}

export default Report;
