import React from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import Counts from "./Counts";
import FeesLineChart from "./LineChart";
import { Card, CardContent } from "@/components/ui/card";

function AccountantDashboard() {
  const { user, setUser } = useContext(UserContext);

  if (!user || (user && user.role !== "Accountant")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="space-y-8 p-6 lg:px-8 containerX">
      <Counts />
      <div>
        <Card className="w-full h-full login_bg border-none flex justify-center">
          <CardContent>
            <div className="pr-6 pt-8 flex flex-row flex-wrap gap-x-8 items-center justify-center ">
              <FeesLineChart />
              <p className="mt-2 w-full text-center text-lg font-medium">
                Last 10 Day Collection
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default AccountantDashboard;
