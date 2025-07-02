import React, { useEffect, useState, useContext } from "react";
import { useStudentContext } from "../../../contexts/StudentContext";
import { UserContext } from "../../../contexts/UserContext";
import axios from "axios";
import { Navigate } from "react-router-dom";
import * as myConst from "../../../myConstants";
import {
  GraduationCap,
  Gift,
  User,
  Home,
  Mail,
  MessageSquare,
  PhoneCall,
} from "lucide-react";
import Loader from "../../components/Loader";
import moment from "moment/moment";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

function StudentProfile() {
  const { user } = useContext(UserContext);
  const { student, setStudent } = useStudentContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      axios
        .post("/student/getStudentProfile", { email: user.email })
        .then((res) => {
          if (res.status === 200) {
            setStudent(res.data.student);
            setLoading(false);
          }
        });
    } catch (error) {}
  }, []);
  
  if (!user || (user && user.role !== "Student")) {
    return <Navigate to="/login" />;
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {student && (
        <div className="flex justify-center items-center give_height ">
          <Card className="inline-flex p-7 m-auto w-fit flex-col gap-2 justify-center items-center">
            <div>
              {student.profilePhoto ? (
                <>
                  <img
                    src={
                      myConst.BACKEND_URL + "/uploads/" + student.profilePhoto
                    }
                    alt=""
                    className="rounded object-cover border-2 border-gray-300 aspect-square h-[13rem]"
                  ></img>
                </>
              ) : (
                <>
                  <img
                    src={myConst.BACKEND_URL + "/uploads/default.png"}
                    alt=""
                    className="rounded border-2 border-gray-300 object-cover aspect-square h-[13rem] "
                  />
                </>
              )}
            </div>
            <div className="flex flex-row gap-2 mt-1">
              <Badge
                variant="primary"
                className="flex flex-row gap-1 items-center"
              >
                <User size={18} />
                <h6 className="">{student.rollNumber}</h6>
              </Badge>
              <Badge
                variant="primary"
                className="flex flex-row gap-1 items-center"
              >
                <Home size={18} />
                <h6 className="">{student.roomNumber}</h6>
              </Badge>
            </div>
            <div className="text-xl text-red-500 font-medium">
              {student.firstName} {student.fatherFirstName} {student.lastName}{" "}
            </div>
            <div className="inline-flex gap-1 text-sm">
              <Mail size={18} />
              {student.email}
            </div>
            <div className="inline-flex gap-4 text-sm">
              <span className="inline-flex gap-1 items-center">
                <PhoneCall size={18} />
                +91 {student.mobileNumber}
              </span>
              <span className="inline-flex gap-1 items-center text-sm">
                <MessageSquare size={18} />
                +91 {student.whatsappNumber}
              </span>
            </div>
            <span className="inline-flex gap-2 items-center text-sm font-semibold">
              <Gift size={18} />
              {moment(student.dateOfBirth).format("DD-MM-YYYY")}
            </span>
            <div>
              <Badge
                variant="primary_2"
                className="flex flex-row gap-2 items-center"
              >
                <GraduationCap size={20} />
                <h6 className="w-fit max-w-[200px] text-center">
                  {student.branch === student.course ? (
                    <>{student.course}</>
                  ) : (
                    <>
                      {student.course} {student.branch}
                    </>
                  )}
                </h6>
              </Badge>
            </div>
          </Card>
        </div>
      )}
    </>
  );
}

export default StudentProfile;
