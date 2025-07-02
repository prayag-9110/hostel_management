import React from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3dCard";
import { UsersRound } from "lucide-react";

function Counts() {
  return (
    <div className="grid grid-cols-2 w-full items-center justify-center gap-x-6">
      <div className="col-span-2 w-full bg-gradient-to-r  from-[#8884d8] to-[#82ca9d] p-6 rounded-xl text-white shadow-lg h-fit border-2 border-purple-500 ">
        <div className="flex flex-col w-full gap-x-8">
          <div className="flex flex-row w-full justify-between pr-5">
            <p className="font-medium text-xl">Total Students</p>
            <UsersRound size={70} className="opacity-70" />
          </div>
          <p className="text-4xl font-semibold">234</p>
        </div>
      </div>
      <div className="w-full h-full bg-gradient-to-r from-[#8884d8] to-[#82ca9d] mt-6 p-5 rounded-xl text-white shadow-lg border-2 border-purple-500 ">
        <div className="flex flex-col gap-8">
          <p className="font-medium text-xl">Due Fees</p>
          <p className="text-4xl font-bold text-red-500 bordered-text">17</p>
        </div>
      </div>
      <div className="w-full h-full bg-gradient-to-r  from-[#82ca9d] to-[#8884d8] mt-6 p-5 rounded-xl text-white shadow-lg border-2 border-purple-500 ">
        <div className="flex flex-col gap-8">
          <p className="font-medium text-xl">Pending Fees</p>
          <p className="text-4xl font-bold text-red-500 bordered-text">45</p>
        </div>
      </div>
    </div>
  );
}

export default Counts;
