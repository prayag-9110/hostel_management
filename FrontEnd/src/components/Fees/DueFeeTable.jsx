import React, { useState } from "react";
import { ReceiptIndianRupee } from "lucide-react";
import moment from "moment";
import axios from "axios";

import { useStudentContext } from "../../../contexts/StudentContext";
import RevertFeeAlertDialogue from "./RevertFeeAlertDialogue";
import AddPaneltyDialog from "./AddPaneltyDialog";
import ClearPaneltyAler from "./ClearPaneltyAler";
import { Button } from "@/components/ui/button";

function DueFeeTable() {
  const today = moment();
  const [expandedRow, setExpandedRow] = useState(null);
  const { dueFees, setSubFees, subFees } = useStudentContext();

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
      <div className="relative overflow-x-auto mt-10 rounded-t-2xl border border-gray-300 shadow-sm">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="pr-2 pl-4 py-3">
                Roll No
              </th>
              <th scope="col" className="px-6 py-3">
                Name
              </th>
              <th scope="col" className="px-6 py-3">
                Year
              </th>
              <th scope="col" className="px-6 py-3">
                Semester
              </th>
              <th scope="col" className="px-6 py-3">
                Amount
              </th>
              <th scope="col" className="px-6 py-3">
                Due Date
              </th>
              <th scope="col" className="px-6 py-3">
                Penalty
              </th>
              <th scope="col" className="px-6 py-3">
                Paid Fees
              </th>
              <th scope="col" className="px-6 py-3">
                Remaining Fees
              </th>
              <th scope="col" className="px-12 py-3 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {dueFees &&
              dueFees.map((fee, index) => (
                <React.Fragment key={index}>
                  <tr className="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 cursor-pointer">
                    <td
                      scope="row"
                      className="py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      {fee.student.rollNumber}
                    </td>
                    <td
                      className="px-6 py-4"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      {fee.student.firstName} {fee.student.lastName}
                    </td>
                    <td
                      className="px-6 py-4 font-semibold"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      {fee.year}
                    </td>
                    <td
                      className="px-6 py-4 font-semibold"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      {fee.semester}
                    </td>
                    <td
                      className="px-6 py-4 font-semibold"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      ₹{fee.amount}
                    </td>
                    <td
                      className={`px-6 py-4 ${
                        moment(fee.dueDate).isBefore(today)
                          ? "text-red-500"
                          : ""
                      }`}
                      onClick={() => handleRowClick(index, fee)}
                    >
                      {moment(fee.dueDate).format("DD-MM-YYYY")}
                    </td>
                    <td
                      className="px-6 py-2"
                      // onClick={() => handleRowClick(index, fee)}
                    >
                      <div className="flex flex-row justify-center items-center gap-2">
                        <span className="font-semibold">₹{fee.penalty}</span>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      ₹{fee.amount - fee.totalAmountPaid}
                    </td>

                    <td
                      className="px-6 py-4 font-semibold"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      ₹{fee.totalAmountPaid}
                    </td>

                    <td className="flex flex-row justify-center items-center gap-2 px-2 py-4">
                      <Button>Send</Button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DueFeeTable;
