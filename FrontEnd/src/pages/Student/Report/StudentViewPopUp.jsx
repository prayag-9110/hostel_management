import React from "react";
import { format } from "date-fns";
import * as myConstants from "../../../../myConstants";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

function StudentViewPopUp({ report }) {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <div key={report._id} className="cursor-pointer">
            <div className="grid grid-cols-3 md:grid-cols-9 bg-gray-50 border-x border-b border-gray-300 p-2 mx-6 cursor-pointe ">
              <div>
                <CheckCheck
                  color={`${report.isMarkedRead ? "#5fdd74" : "gray"}`}
                />
              </div>
              <div className="">{report.receiver}</div>
              <div className="hidden md:block truncate col-span-2 text-center">
                {report.title}
              </div>
              <div className="hidden md:block truncate col-span-3 text-center">
                {report.description}
              </div>
              <div className="text-center md:col-span-2">
                {format(new Date(report.updatedAt), "dd-MM-yyyy")}
              </div>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-h-[90vh] md:min-w-[700px]">
          <DialogHeader>
            <DialogTitle>Report</DialogTitle>
          </DialogHeader>
          <ScrollArea className="md:max-h-[70vh]">
            <div className="p-3 border-2 border-gray-400">
              <div className="p-2 space-y-2 border border-gray-300">
                <div className="w-full">
                  <span className="font-semibold">To:</span> {report.receiver}
                </div>
                <div className="w-full">
                  <span className="font-semibold">Subject:</span> {report.title}
                </div>
                <div className="w-full">
                  <span className="font-semibold">Description:</span>{" "}
                  {report.description}
                </div>
              </div>
              {report.photo && (
                <div className="w-full inline-flex mt-4 justify-center">
                  <img
                    className="w-[300px] aspect-square object-cover"
                    src={
                      myConstants.BACKEND_URL + "/uploadsReport/" + report.photo
                    }
                  />
                </div>
              )}
            </div>
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <div className="w-full flex justify-center">
                <Button variant="blue_btn" className="w-fit px-10">
                  Close
                </Button>
              </div>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default StudentViewPopUp;
