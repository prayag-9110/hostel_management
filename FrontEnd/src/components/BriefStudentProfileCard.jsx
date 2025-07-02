import React from "react";

import * as myConstants from "../../myConstants";
import { Badge } from "@/components/ui/badge";
import { Home, User } from "lucide-react";

function BriefStudentProfileCard({ student }) {
  return (
    <div>
      {student && (
        <div className="bg-slate-100 w-full border rounded-lg mt-2 border-gray-400/50 shadow p-3 flex flex-row gap-4">
          <div>
            {student.profilePhoto ? (
              <img
                className="rounded aspect-square object-cover border-2 border-bg_dark_section w-20"
                src={
                  myConstants.BACKEND_URL + "/uploads/" + student.profilePhoto
                }
              ></img>
            ) : (
              <img
                className="rounded aspect-square object-cover border border-bg_dark_section/50 w-20"
                src={myConstants.BACKEND_URL + "/uploads/default.png"}
              ></img>
            )}
          </div>
          <div className="flex flex-col">
            <div className="font-medium text-base mb-1">
              {student.firstName} {student.fatherFirstName} {student.lastName}
            </div>
            <div className="flex flex-row gap-2 mb-1">
              <Badge
                variant="primary_2"
                className="flex flex-row gap-1 items-center"
              >
                <User size={14} />
                <h6 className="">{student.rollNumber}</h6>
              </Badge>
              <Badge
                variant="primary"
                className="flex flex-row gap-1 items-center"
              >
                <Home size={14} />
                <h6 className="">{student.roomNumber}</h6>
              </Badge>
            </div>
            <div className="flex flex-row gap-2">
              <Badge variant="primary_2">{student.course}</Badge>
              <Badge variant="primary">{student.branch}</Badge>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BriefStudentProfileCard;
