import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3dCard";

function Counts() {
  function formatNumber(number) {
    // Check if the number is greater than or equal to 1 crore
    if (number >= 10000000) {
      // Divide the number by 10000000 to convert it to crores and round it to 2 decimal places
      const crore = (number / 10000000).toFixed(2);
      // Append 'cr' to represent crores
      return crore + "cr";
    }
    // Check if the number is greater than or equal to 1 lakh
    else if (number >= 100000) {
      // Divide the number by 100000 to convert it to lakhs and round it to 2 decimal places
      const lakh = (number / 100000).toFixed(2);
      // Append 'L' to represent lakhs
      return lakh + "L";
    }
    // Check if the number is greater than or equal to 1 thousand
    else if (number >= 1000) {
      // Divide the number by 1000 to convert it to thousands and round it to 2 decimal places
      const thousand = (number / 1000).toFixed(2);
      // Append 'k' to represent thousands
      return thousand + "k";
    } else {
      // If the number is less than 1 thousand, return the original number
      return number.toString();
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start justify-start gap-4">
      <div className="w-full h-full bg-gradient-to-r from-[#8884d8] to-[#82ca9d] p-6 rounded-xl text-white shadow-lg border-2 border-purple-500 ">
        <div className="flex flex-col gap-9">
          <span>
            <p className="font-medium text-xl">Collected Amount</p>
            <p className="font-medium text-sm opacity-70">(This Semester)</p>
          </span>
          <p className="text-4xl font-bold ">{formatNumber(2510000)}</p>
        </div>
      </div>
      <div className="w-full h-full bg-gradient-to-r  from-[#82ca9d] to-[#8884d8]  p-6 rounded-xl text-white shadow-lg border-2 border-purple-500 ">
        <div className="flex flex-col gap-9">
          <span>
            <p className="font-medium text-xl">Number of Payments</p>
            <p className="font-medium text-sm opacity-70">(This Semester)</p>
          </span>
          <p className="text-4xl font-bold">68</p>
        </div>
      </div>
      <div className="w-full h-full bg-gradient-to-r  from-[#8884d8] to-[#82ca9d] p-6 rounded-xl text-white shadow-lg border-2 border-purple-500 ">
        <div className="flex flex-col gap-14">
          <p className="font-medium text-xl">Pending Fees</p>
          <p className="text-4xl font-bold ">45</p>
        </div>
      </div>
      <div className="w-full h-full bg-gradient-to-r from-[#82ca9d] to-[#8884d8] p-6 rounded-xl text-white shadow-lg border-2 border-purple-500 ">
        <div className="flex flex-col gap-14">
          <p className="font-medium text-xl">Due Fees</p>
          <p className="text-4xl font-bold">17</p>
        </div>
      </div>
    </div>
  );
}

export default Counts;
