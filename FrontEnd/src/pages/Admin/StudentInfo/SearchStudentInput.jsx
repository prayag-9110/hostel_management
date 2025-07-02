import React from "react";
import { Search } from "lucide-react";

import BriefStudentProfileCard from "@/components/BriefStudentProfileCard";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

function SearchStudentInput({
  query,
  setQuery,
  suggestionStudents,
  handleSeachedStudent,
  isLoading,
}) {
  return (
    <div>
      <div className="font-semibold mx-1">Search student</div>
      <div className="relative">
        <Input
          type="text"
          id="query"
          name="query"
          value={query}
          onChange={(ev) => {
            setQuery(ev.target.value);
          }}
          className="shadow appearance-none border rounded-lg w-full lg:w-1/2 py-2 px-10 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <div className="absolute inset-y-0 left-100 pl-3 flex items-center pointer-events-none">
          <i className="fas fa-search text-gray-500">
            <Search size={20} />
          </i>
        </div>
        <div className="absolute w-full lg:w-1/2 z-10">
          <div className="flex flex-col cursor-pointer ">
            {isLoading && suggestionStudents.length === 0 && (
              <>
                <div className="bg-slate-100 w-full border rounded-lg mt-2 border-gray-400/50 shadow p-3 flex flex-row gap-4">
                  <Skeleton className="h-[75px] w-20 rounded" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-[250px]" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-[75px]" />
                      <Skeleton className="h-5 w-[75px]" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-[75px]" />
                      <Skeleton className="h-5 w-[150px]" />
                    </div>
                  </div>
                </div>
                <div className="bg-slate-100 w-full border rounded-lg mt-2 border-gray-400/50 shadow p-3 flex flex-row gap-4">
                  <Skeleton className="h-[75px] w-20 rounded" />
                  <div className="space-y-1">
                    <Skeleton className="h-5 w-[250px]" />
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-[75px]" />
                      <Skeleton className="h-5 w-[75px]" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-5 w-[75px]" />
                      <Skeleton className="h-5 w-[150px]" />
                    </div>
                  </div>
                </div>
              </>
            )}
            {suggestionStudents &&
              query.length != 0 &&
              suggestionStudents.slice(0, 3).map((student, index) => (
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    handleSeachedStudent(student);
                  }}
                >
                  <BriefStudentProfileCard student={student} />
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchStudentInput;
