import React, { useContext } from "react";
import { UserContext } from "../../../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PersonalLeaveCard from "@/components/Leave/PersonalLeaveCard";
import BulkLeaveCard from "@/components/Leave/BulkLeaveCard";
import LeaveStudents from "@/components/Leave/LeaveStudents";
import LeaveLog from "@/components/Leave/LeaveLog";
import { Separator } from "@/components/ui/separator";

function Leave() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  if (!user || (user && user.role !== "Admin")) {
    navigate("/login");
  }
  return (
    <>
      <div className="p-6 lg:p-8 containerX">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="ml-auto">
            <TabsTrigger value="personal">Personal Leave</TabsTrigger>
            <Separator orientation="vertical" />
            <TabsTrigger value="bulk">Bulk Leave</TabsTrigger>
            <Separator orientation="vertical" />
            <TabsTrigger value="student">On Leave Students</TabsTrigger>
          </TabsList>

          <TabsContent value="personal">
            <PersonalLeaveCard />
          </TabsContent>
          <TabsContent value="bulk">
            <BulkLeaveCard />
          </TabsContent>
          <TabsContent value="student">
            <LeaveStudents />
          </TabsContent>
        </Tabs>
        {/* <div>
          <RollNumberInput />
        </div> */}
      </div>
    </>
  );
}

export default Leave;
