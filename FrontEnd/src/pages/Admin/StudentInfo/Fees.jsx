import React, { useState } from "react";
import { useStudentContext } from "../../../../contexts/StudentContext";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import moment from "moment";

function Fees() {
  const today = moment();
  const [expandedRow, setExpandedRow] = useState(null);
  const [subFees, setSubFees] = useState([]);
  const { student } = useStudentContext();

  const handleRowClick = (index, fee) => {
    if (expandedRow === index) {
      // If the same row is clicked again, hide the sub-row
      setExpandedRow(null);
    } else {
      // If a different row is clicked, show the sub-row
      setSubFees(fee.paidAmount);
      setExpandedRow(index);
    }
  };
  return (
    <div>
      {student.fees && student.fees.length !== 0 ? (
        <>
          <Table className={cn("rounded-none")}>
            <TableCaption>
              A list of all fees of {student.firstName} {student.lastName}
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Year</TableHead>
                <TableHead className="text-center">Semester</TableHead>
                <TableHead className="text-center">Amount</TableHead>
                <TableHead className="text-center">Penalty</TableHead>
                <TableHead className="text-center">Due Date</TableHead>
                <TableHead className="text-center">Paid Amount</TableHead>
                <TableHead className="text-center">Payment Date</TableHead>
                <TableHead className="text-center">Method</TableHead>
                <TableHead className="text-center">Status </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {student.fees.map((fee, index) => (
                <>
                  <TableRow
                    className={cn("cursor-pointer")}
                    key={index}
                    onClick={() => handleRowClick(index, fee)}
                  >
                    <TableCell className={cn("bg-white")}>{fee.year}</TableCell>

                    <TableCell className={cn("bg-white text-center")}>
                      {fee.semester}
                    </TableCell>
                    <TableCell
                      className={cn("bg-white text-center font-semibold")}
                    >
                      ₹{fee.amount}
                    </TableCell>
                    <TableCell className={cn("bg-white text-center")}>
                      ₹{fee.penalty}
                    </TableCell>
                    <TableCell
                      className={cn(
                        `bg-white text-center ${
                          moment(fee.dueDate).isBefore(today) &&
                          fee.paymentStatus !== "Paid"
                            ? "text-red-500"
                            : ""
                        }`
                      )}
                    >
                      {moment(fee.dueDate).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell
                      className={cn("bg-white text-center font-semibold")}
                    >
                      ₹{fee.totalAmountPaid}
                    </TableCell>
                    <TableCell
                      className={cn(`bg-white text-center`)}
                    ></TableCell>
                    <TableCell
                      className={cn(`bg-white text-center`)}
                    ></TableCell>
                    <TableCell
                      className={cn(
                        `bg-white font-semibold text-center ${
                          fee.paymentStatus === "Pending"
                            ? "text-red-500"
                            : fee.paymentStatus === "Partial"
                            ? "text-yellow-500/90"
                            : "text-green-500"
                        }`
                      )}
                    >
                      {fee.paymentStatus}
                    </TableCell>
                  </TableRow>
                  {expandedRow === index &&
                    subFees &&
                    subFees.map((subFee, index) => (
                      <TableRow key={index}>
                        <TableCell className={cn("bg-gray-100")}></TableCell>
                        <TableCell
                          className={cn("bg-gray-100 text-center")}
                        ></TableCell>
                        <TableCell
                          className={cn("bg-gray-100 text-center")}
                        ></TableCell>
                        <TableCell
                          className={cn("bg-gray-100 text-center")}
                        ></TableCell>
                        <TableCell
                          className={cn("bg-gray-100 text-center")}
                        ></TableCell>
                        <TableCell className={cn("bg-gray-100 text-center")}>
                          ₹{subFee.amount}
                        </TableCell>
                        <TableCell className={cn("bg-gray-100 text-center")}>
                          {moment(subFee.date).format("DD-MM-YYYY")}
                        </TableCell>
                        <TableCell className={cn("bg-gray-100 text-center")}>
                          {subFee.method}
                        </TableCell>
                        <TableCell
                          className={cn("bg-gray-100 text-center")}
                        ></TableCell>
                      </TableRow>
                    ))}
                </>
              ))}
            </TableBody>
          </Table>
        </>
      ) : (
        <>
          <div className="text-center text-xl mt-10">No Fees</div>
        </>
      )}
    </div>
  );
}

export default Fees;
