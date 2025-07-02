import React, { useEffect, useState } from "react";
import { Info, ReceiptIndianRupee } from "lucide-react";
import moment from "moment";
import axios from "axios";

import { useStudentContext } from "../../../contexts/StudentContext";
import CollectFeeDialog from "./CollectFeeDialog";
import RevertFeeAlertDialogue from "./RevertFeeAlertDialogue";
import AddPaneltyDialog from "./AddPaneltyDialog";
import ClearPaneltyAler from "./ClearPaneltyAler";
import DeleteFee from "./DeleteFee";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function CollectFeeTable() {
  const today = moment();
  const [expandedRow, setExpandedRow] = useState(null);
  const { student, setSubFees, subFees } = useStudentContext();
  const [receiptLoading, setReceiptLoading] = useState(
    subFees ? new Array(subFees.length).fill(false) : []
  );

  const handleRowClick = (index, fee) => {
    if (expandedRow === index) {
      // If the same row is clicked again, hide the sub-row
      setExpandedRow(null);
    } else {
      // If a different row is clicked, show the sub-row
      setReceiptLoading(
        fee.paidAmount ? new Array(fee.paidAmount.length).fill(false) : []
      );
      setSubFees(fee.paidAmount);
      setExpandedRow(index);
    }
  };

  const generateReceipt = async (fee, subFee, index) => {
    try {
      setReceiptLoading((prevLoading) =>
        prevLoading.map((_, i) => (i === index ? true : _))
      );

      const response = await axios.post(
        "/accountant/generateReceipt",
        {
          feeId: fee._id,
          subFeeId: subFee._id,
        },
        {
          responseType: "arraybuffer", // Set responseType to handle binary data
        }
      );

      // Create a Blob from the PDF content
      const blob = new Blob([response.data], { type: "application/pdf" });

      // Create a temporary link element
      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(blob);
      link.download = "fee_receipt.pdf";

      // Append the link to the body and trigger the download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setReceiptLoading((prevLoading) =>
        prevLoading.map((_, i) => (i === index ? false : _))
      );
    } catch (error) {
      // Handle error (e.g., display an error message)
      console.error("Error generating fee receipt:", error);
      setReceiptLoading((prevLoading) =>
        prevLoading.map((_, i) => (i === index ? false : _))
      );
    }
  };

  return (
    <div>
      <div className="relative overflow-x-auto mt-10 rounded-t-2xl border border-gray-300 shadow-sm">
        <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400">
            <tr>
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
              <th scope="col" className="px-2 py-3">
                Penalty
              </th>
              <th scope="col" className="px-6 py-3">
                Paid
              </th>
              <th scope="col" className="px-6 py-3">
                Balance
              </th>
              <th scope="col" className="px-6 py-3">
                Paid Date
              </th>
              <th scope="col" className="px-6 py-3">
                Method
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-12 py-3 text-left">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {student &&
              student.fees.map((fee, index) => (
                <>
                  <tr className="bg-white border-b border-gray-300 dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 cursor-pointer">
                    <td
                      scope="row"
                      className="py-4 text-gray-900 whitespace-nowrap dark:text-white"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      {fee.year}
                    </td>
                    <td
                      className="py-3"
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
                        moment(fee.dueDate).isBefore(today) &&
                        fee.paymentStatus !== "Paid"
                          ? "text-red-500"
                          : ""
                      }`}
                      onClick={() => handleRowClick(index, fee)}
                    >
                      {moment(fee.dueDate).format("DD-MM-YYYY")}
                    </td>
                    <td
                      className="py-2"
                      // onClick={() => handleRowClick(index, fee)}
                    >
                      <div className="flex flex-row justify-center items-center gap-2">
                        <span className="font-semibold">₹{fee.penalty}</span>
                        <div className="flex flex-col">
                          <AddPaneltyDialog fee={fee} />
                          <ClearPaneltyAler fee={fee} />
                        </div>
                      </div>
                    </td>
                    <td
                      className="px-6 py-4 font-semibold"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      ₹{fee.totalAmountPaid}
                    </td>
                    <td
                      className="px-6 py-4"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      ₹{fee.amount - fee.totalAmountPaid}
                    </td>
                    <td onClick={() => handleRowClick(index, fee)}></td>
                    <td onClick={() => handleRowClick(index, fee)}></td>
                    <td
                      className="uppercase px-6 py-4"
                      onClick={() => handleRowClick(index, fee)}
                    >
                      <button
                        size="sm"
                        className={`font-semibold h-6 rounded-md cursor-pointer ${
                          fee.paymentStatus === "Pending"
                            ? "text-red-500"
                            : fee.paymentStatus === "Partial"
                            ? "text-yellow-500/80"
                            : "text-green-500"
                        }`}
                      >
                        {fee.paymentStatus}
                      </button>
                    </td>
                    <td className="flex flex-row justify-center items-center gap-2 px-2 py-4">
                      <CollectFeeDialog
                        fee={fee}
                        setReceiptLoading={setReceiptLoading}
                      />
                      <DeleteFee fee={fee} />
                    </td>
                  </tr>
                  {expandedRow === index &&
                    subFees &&
                    subFees.map((subFee, index) => (
                      <tr className="bg-gray-200 border-b border-gray-300">
                        <td className="px-6 py-4"></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>₹{subFee.amount}</td>
                        <td></td>
                        <td>{moment(subFee.date).format("DD-MM-YYYY")}</td>
                        <td className="text-center flex items-center gap-1 justify-center">
                          {subFee.method}
                          {subFee.method === "Online" && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Info
                                    size={16}
                                    color="red"
                                    className="cursor-pointer"
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>Paymet Id: {subFee.razorpay_payment_id}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                        </td>
                        <td></td>
                        <td className="pr-2 py-4 flex flex-row items-center justify-start gap-1">
                          <RevertFeeAlertDialogue
                            subFeeAmount={subFee.amount}
                            subFeeId={subFee._id}
                            feeId={fee._id}
                            setReceiptLoading={setReceiptLoading}
                          />
                          <button
                            size="sm"
                            onClick={() => generateReceipt(fee, subFee, index)}
                            className="bg-cyan-500 cursor-pointer text-white text-xs h-8 rounded-md px-2 flex items-center hover:bg-cyan-500/90 hover:ring-1 hover:ring-cyan-700"
                          >
                            {receiptLoading[index] ? (
                              <>
                                <svg
                                  aria-hidden="true"
                                  className="w-14 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                  viewBox="0 0 100 101"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                  />
                                  <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                  />
                                </svg>
                              </>
                            ) : (
                              <>
                                <ReceiptIndianRupee size={14} />
                                <div className="ml-1">Reciept</div>
                              </>
                            )}
                          </button>
                        </td>
                      </tr>
                    ))}
                </>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default CollectFeeTable;
