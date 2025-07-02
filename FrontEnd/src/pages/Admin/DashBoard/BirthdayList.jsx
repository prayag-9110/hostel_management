import React from "react";
import { Gift } from "lucide-react";

function BirthdayList() {
  return (
    <div className="px-6 py-4 login_bg w-full h-full max-h-[335px] overflow-y-auto rounded-xl">
      <div className="text-lg inline-flex gap-2 font-semibold text-[#8884d8]">
        Today's Birthdays <Gift color="#82ca9d" />
      </div>
      <div className="flex flex-col gap-2 mt-4 w-full">
        <div className="flex flex-row items-center gap-4 border border-gray-300 rounded-xl px-2 py-1">
          <img
            src={
              "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600"
            }
            alt="profilePhoto"
            className="h-[2.5rem] w-[2.5rem] rounded-full object-cover"
          />
          <p>944 - Aarav Patel</p>
        </div>
        <div className="flex flex-row items-center gap-4 border border-gray-300 rounded-xl px-2 py-1">
          <img
            src={
              "https://images.unsplash.com/photo-1543084951-1650d1468e2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5kaWFuJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="profilePhoto"
            className="h-[2.5rem] w-[2.5rem] rounded-full object-cover"
          />
          <p>930 - Rohan Gupta</p>
        </div>

        <div className="flex flex-row items-center gap-4 border border-gray-300 rounded-xl px-2 py-1">
          <img
            src={
              "https://images.unsplash.com/flagged/photo-1571367034861-e6729ad9c2d5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aW5kaWFuJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="profilePhoto"
            className="h-[2.5rem] w-[2.5rem] rounded-full object-cover"
          />
          <p>601 - Arjun Desai</p>
        </div>
        <div className="flex flex-row items-center gap-4 border border-gray-300 rounded-xl px-2 py-1">
          <img
            src={
              "https://images.unsplash.com/photo-1616002851413-ebcc9611139d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8aW5kaWFuJTIwbWFsZXxlbnwwfHwwfHx8MA%3D%3D"
            }
            alt="profilePhoto"
            className="h-[2.5rem] w-[2.5rem] rounded-full object-cover"
          />
          <p>886 - Aditya Sharma</p>
        </div>
      </div>
    </div>
  );
}

export default BirthdayList;
