import React, { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { UserContext } from "../../../../contexts/UserContext";
import { useReportContext } from "../../../../contexts/ReportContext";

import { Send, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";

function StudentAddReportPopUp() {
  const { toast } = useToast();
  const { setReportChanged } = useReportContext();
  const [title, setTitle] = useState("");
  const [receiver, setReceiver] = useState("");
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState("");
  const { user, setUser } = useContext(UserContext);

  if (!user || (user && user.role !== "Student")) {
    return <Navigate to="/login" />;
  }

  async function addReport(ev) {
    ev.preventDefault();
    if (title == "" || receiver == "" || description === "") {
      toast({
        variant: "destructive",
        title: "Please fill all fields.",
      });
    } else {
      try {
        const formData = new FormData();
        formData.append("photo", photo);
        formData.append("title", title);
        formData.append("receiver", receiver);
        formData.append("description", description);

        await axios
          .post("/report/add-report", formData, {
            headers: { "Content-type": "multipart/form-data" },
          })
          .then((res) => {
            if (res.status === 200) {
              toast({
                title: "Report added successfully.",
              });
              setTitle("");
              setDescription("");
              setReceiver("");
              setPhoto("");
              setReportChanged((prev) => prev + 1);
            }
          });
      } catch (err) {
        if (err.response.status === 500)
          toast({
            variant: "destructive",
            title: "Submission failed !! ",
          });
        console.log(err);
      }
    }
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="py-5 inline-flex justify-center w-full">
            <Button variant="blue_btn" className={`w-fit space-x-2`}>
              <Plus />
              <div>Add new report</div>
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <span>Add new report</span>
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <form onSubmit={addReport} className="space-y-3">
            <div className="w-full flex gap-2">
              <span className="font-semibold">To:</span>
              <select
                value={receiver}
                className="w-full border-gray-300 p-0.5 border rounded-md focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                onChange={(ev) => {
                  if (ev.target.value === "Select receiver") {
                    setReceiver("");
                  } else {
                    setReceiver(ev.target.value);
                  }
                }}
              >
                <option>Select receiver</option>
                <option>Accountant</option>
                <option>Manager</option>
                <option>Admin</option>
              </select>
            </div>

            <div className="w-full inline-flex mt-2 items-center gap-2">
              <span className="font-semibold">Subject:</span>
              <Input
                type="text"
                value={title}
                className="h-7"
                onChange={(ev) => {
                  setTitle(ev.target.value);
                }}
              />
            </div>
            <div className="w-full">
              <span className="font-semibold">Description:</span>{" "}
              <textarea
                type="text"
                className="flex min-h-[120px] w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                value={description}
                onChange={(ev) => {
                  setDescription(ev.target.value);
                }}
              />
            </div>

            <label className="flex flex-col w-full">
              <div className="">
                <div className="flex items-center  gap-4">
                  <div className="font-semibold">
                    Upload&nbsp;item&nbsp;photo:
                  </div>
                  <div className="grow">
                    <input
                      type="file"
                      onChange={(ev) => {
                        setPhoto(ev.target.files[0]);
                      }}
                      name="photo"
                      className="hidden mt-1 mb-2"
                    />
                    <div className="bg-blue-500 text-white hover:bg-blue-500/90 hover:ring-2 hover:ring-blue-700  hover:transition-all duration-75 w-full p-1 rounded-md py-2 px-4 flex justify-center items-center cursor-pointer">
                      <Upload />
                    </div>
                  </div>
                </div>
                <div className="truncate w-40 mx-auto mt-2">
                  {photo && photo.name}
                </div>
              </div>
            </label>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Close</Button>
              </DialogClose>
              <DialogClose asChild>
                <Button type="submit" className="hover:bg-red-500">
                  <Send size={15} className="mr-2" />
                  Submit
                </Button>
              </DialogClose>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default StudentAddReportPopUp;
