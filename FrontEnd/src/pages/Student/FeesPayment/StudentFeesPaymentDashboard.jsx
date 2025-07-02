import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useStudentContext } from "../../../../contexts/StudentContext";
import { UserContext } from "../../../../contexts/UserContext";
import { Info, ReceiptIndianRupee } from "lucide-react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import moment from "moment";
import { Navigate } from "react-router-dom";
import PaymentButton from "./PaymentButton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

function StudentFeesPaymentDashboard() {
  const { student, setStudent, subFees, setSubFees } = useStudentContext();
  const { user, setUser } = useContext(UserContext);
  const [receiptLoading, setReceiptLoading] = useState(
    subFees ? new Array(subFees.length).fill(false) : []
  );
  const today = moment();
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    try {
      axios
        .post("/student/getStudentProfile", { email: user.email })
        .then((res) => {
          if (res.status === 200) {
            setStudent(res.data.student);
          }
        });
    } catch (error) {}
  }, []);

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

  const generateReceipt = async (fee, subFee, index) => {
    try {
      setReceiptLoading((prevLoading) =>
        prevLoading.map((_, i) => (i === index ? true : _))
      );

      console.log(receiptLoading[index]);

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

  if (!user || (user && user.role !== "Student")) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="p-6 lg:p-8 min-h-screen containerX">
        <h1 className="w-full text-center mb-8 text-2xl font-semibold">
          Your Fee Details
        </h1>
        {student && (
          <div>
            {student.fees && student.fees.length !== 0 ? (
              <>
                <Table className={cn("rounded-none")}>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead className="text-center">Semester</TableHead>
                      <TableHead className="text-center">Amount</TableHead>
                      <TableHead className="text-center">Penalty</TableHead>
                      <TableHead className="text-center">Due Date</TableHead>
                      <TableHead className="text-center">Paid Amount</TableHead>
                      <TableHead className="text-center">
                        Payment Date
                      </TableHead>
                      <TableHead className="text-center">Method </TableHead>
                      <TableHead className="text-center">Status </TableHead>
                      <TableHead className="text-center">Action </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {student.fees.map((fee, index) => (
                      <>
                        <TableRow className={cn("cursor-pointer")} key={index}>
                          <TableCell
                            onClick={() => handleRowClick(index, fee)}
                            className={cn("bg-white")}
                          >
                            {fee.year}
                          </TableCell>

                          <TableCell
                            onClick={() => handleRowClick(index, fee)}
                            className={cn("bg-white text-center")}
                          >
                            {fee.semester}
                          </TableCell>
                          <TableCell
                            className={cn("bg-white text-center font-semibold")}
                          >
                            ₹{fee.amount}
                          </TableCell>
                          <TableCell
                            onClick={() => handleRowClick(index, fee)}
                            className={cn("bg-white text-center")}
                          >
                            ₹{fee.penalty}
                          </TableCell>
                          <TableCell
                            onClick={() => handleRowClick(index, fee)}
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
                            onClick={() => handleRowClick(index, fee)}
                            className={cn("bg-white text-center font-semibold")}
                          >
                            ₹{fee.totalAmountPaid}
                          </TableCell>
                          <TableCell
                            onClick={() => handleRowClick(index, fee)}
                            className={cn(`bg-white text-center`)}
                          >
                            -
                          </TableCell>
                          <TableCell
                            onClick={() => handleRowClick(index, fee)}
                            className={cn(`bg-white text-center`)}
                          >
                            -
                          </TableCell>
                          <TableCell
                            onClick={() => handleRowClick(index, fee)}
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
                          <TableCell className={cn(`bg-white text-center`)}>
                            {fee.paymentStatus === "Paid" ? (
                              <p className="h-full">-</p>
                            ) : (
                              <>
                                <PaymentButton fee={fee} />
                              </>
                            )}
                          </TableCell>
                        </TableRow>
                        {expandedRow === index &&
                          subFees &&
                          subFees.map((subFee, index) => (
                            <TableRow key={index}>
                              <TableCell
                                className={cn("bg-gray-100")}
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
                              <TableCell
                                className={cn("bg-gray-100 text-center")}
                              ></TableCell>
                              <TableCell
                                className={cn("bg-gray-100 text-center")}
                              >
                                ₹{subFee.amount}
                              </TableCell>
                              <TableCell
                                className={cn("bg-gray-100 text-center")}
                              >
                                {moment(subFee.date).format("DD-MM-YYYY")}
                              </TableCell>
                              <TableCell
                                className={cn(
                                  "bg-gray-100 text-center flex items-center gap-1 justify-center"
                                )}
                              >
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
                                        <p>
                                          Paymet Id:{" "}
                                          {subFee.razorpay_payment_id}
                                        </p>
                                      </TooltipContent>
                                    </Tooltip>
                                  </TooltipProvider>
                                )}
                              </TableCell>
                              <TableCell
                                className={cn("bg-gray-100 text-center")}
                              ></TableCell>
                              <TableCell className="flex flex-row items-center justify-center gap-1">
                                <button
                                  size="sm"
                                  onClick={() =>
                                    generateReceipt(fee, subFee, index)
                                  }
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
                              </TableCell>
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
        )}
      </div>
    </>
  );
}

export default StudentFeesPaymentDashboard;
