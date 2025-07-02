import React from "react";
import moment from "moment";

import ProfilePhoto from "@/components/ProfilePhoto";
import { useStudentContext } from "../../../../contexts/StudentContext";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Home, User } from "lucide-react";

function BriefInfoCard() {
  const { student } = useStudentContext();

  return (
    <div className="bg-white border-2 p-6 w-fit">
      <div className="flex justify-center">
        <ProfilePhoto />
      </div>
      <div className="p-4 flex flex-col items-center justify-center gap-2">
        <div className="text-red-500 font-semibold text-lg uppercase">
          {student.firstName} {student.lastName}
        </div>
        <div className="flex flex-row gap-2 mt-1">
          <Badge variant="primary" className="flex flex-row gap-1 items-center">
            <User size={18} />
            <h6 className="">{student.rollNumber}</h6>
          </Badge>
          <Badge
            variant="primary_2"
            className="flex flex-row gap-1 items-center"
          >
            <Home size={18} />
            <h6 className="">{student.roomNumber}</h6>
          </Badge>
        </div>
        <div className="flex flex-row gap-2">
          <Badge variant="primary" className="flex flex-row gap-1 items-center">
            <h6 className="">Active</h6>
          </Badge>
          <Badge
            variant="primary_2"
            className="flex flex-row gap-1 items-center"
          >
            <User size={18} />
            <h6 className="">
              {moment(student.admissionDate).format("YYYY")}
              {student.rollNumber}
            </h6>
          </Badge>
        </div>
        <div>
          <Badge
            variant="primary_3"
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
      </div>
    </div>
  );
}

export default BriefInfoCard;
