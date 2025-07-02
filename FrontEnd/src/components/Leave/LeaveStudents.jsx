import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import axios from "axios";
import moment from "moment/moment";
import Loader from "../Loader";

function LeaveStudents() {
  const [isLoading, setIsLoading] = useState(true);
  const [leaves, setLeaves] = useState([]);

  const fetchData = async () => {};

  useEffect(() => {
    // fetchData();
    try {
      axios.get("/leave/findStudentsOnLeave").then((res) => {
        setIsLoading(false);
        if (res.status === 200) {
          setLeaves(res.data.leaveApplications);
          console.log(res.data.leaveApplications);
        }
      });
    } catch (error) {
      setIsLoading(false);
      if (error.response.status === 404) {
        toast({
          variant: "destructive",
          title: "No Students on Leave !!!",
        });
      }
    }
  }, []);

  if (isLoading) {
    return (
      <div>
        <Loader height={"h-[50vh]"} />
      </div>
    );
  }

  return (
    <div className="mt-6">
      {leaves ? (
        <>
          <Table>
            <TableCaption>A list of all on leave students</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Index</TableHead>
                <TableHead className="text-center">Roll No</TableHead>
                <TableHead className="text-center">Name</TableHead>
                <TableHead className="text-center">Room No</TableHead>
                <TableHead className="text-center">From</TableHead>
                <TableHead className="text-center">To</TableHead>
                <TableHead className="text-center">Reason</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {leaves.map((leave, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{index + 1}</TableCell>
                  <TableCell className="text-center">
                    {leave.student.rollNumber}
                  </TableCell>
                  <TableCell className="text-center">
                    {leave.student.firstName} {leave.student.lastName}
                  </TableCell>
                  <TableCell className="text-center">
                    {leave.student.roomNumber}
                  </TableCell>
                  <TableCell className="text-center">
                    {moment(leave.startDate).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell className="text-center">
                    {moment(leave.endDate).format("DD-MM-YYYY")}
                  </TableCell>
                  <TableCell className="text-center">{leave.reason}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <>
          {!isLoading && (
            <div className="text-center text-xl mt-10">
              No students are on leave
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default LeaveStudents;
