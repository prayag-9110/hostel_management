import React from "react";
import { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { Navigate } from "react-router-dom";
import StackedBarChart from "./StackedBarChart";
import PieChart from "./VacancyPieChart";
import LeavePieChart from "./LeavePieChart";
import { Card, CardContent } from "@/components/ui/card";
import LineChart from "./LineChart";
import Counts from "./Counts";

import BirthdayList from "./BirthdayList";

function AdminDashBoard() {
  const { user, setUser } = useContext(UserContext);

  if (!user || (user && user.role !== "Admin")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="gap-x-8 p-6 lg:p-8 containerX">
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 w-full">
        <section className="md:col-span-2 h-full">
          <Card className="w-full h-full login_bg border-none">
            <CardContent>
              <div className="pr-6  flex flex-row flex-wrap gap-x-8 items-center justify-center lg:justify-evenly">
                <div className="">
                  <PieChart />
                  <p className="text-center mt-4 font-medium">
                    Total Vacancy Chart
                  </p>
                </div>
                <div>
                  <LeavePieChart />
                  <p className="text-center mt-4 font-medium">
                    On-Off Leave Chart
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
        <section className="w-full mb-4">
          <Counts />
        </section>
        <section>
          <Card className="w-full h-full login_bg border-none flex justify-center">
            <CardContent>
              <div className="pr-6 pt-5 flex flex-row flex-wrap gap-x-8 items-center justify-center ">
                <StackedBarChart />
                <p className="text-center mt-4 font-medium">
                  Block Vacancy Graph
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
        <section>
          <Card className="w-full h-full login_bg border-none flex justify-center">
            <CardContent>
              <div className="pr-6 pt-5 flex flex-row flex-wrap gap-x-8 items-center justify-center">
                <LineChart />
                <p className="text-center mt-4 font-medium">
                  Present Students Count
                </p>
              </div>
            </CardContent>
          </Card>
        </section>
        <div className="">
          <BirthdayList />
        </div>
      </div>
    </div>
  );
}

export default AdminDashBoard;
