import React, { useContext, useState } from "react";
import axios from "axios";

// Components
import Loader from "../../../components/Loader";
import { Input } from "@/components/ui/input";
import { useBlockContext } from "../../../../contexts/BlocksContext";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

function AddStudentPopup({
  blockId,
  roomNo,
  AllocatedRoomStudents,
  capacity,
  setFetch,
  setAllocatedRoomStudents,
}) {
  const { toast } = useToast();
  const { setBlocks } = useBlockContext();
  const [rollNo, setRollNo] = useState("");
  const [loading, setLoading] = useState(false);

  async function addStudent(ev) {
    ev.preventDefault();
    setLoading(true);
    try {
      axios
        .post("/admin/allocate-student/" + blockId, {
          rollNo,
          roomNumber: roomNo,
        })
        .then((res) => {
          if (res.status === 200) {
            setFetch(true);
            setBlocks(res.data.UpdatedBlocks);
            setAllocatedRoomStudents(res.data.roomInfo.allocatedStudents);
            toast({
              title: "Student allocated successfully ✔",
            });
            setRollNo("");
            setLoading(false);
          }
        });
    } catch (error) {
      if (error.response.status === 404) {
        setRollNo("");
        setLoading(false);
        toast({
          variant: "destructive",
          title: "Student not found",
        });
      }
    }
  }

  return (
    <>
      {AllocatedRoomStudents.length < capacity && (
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <div className="flex justify-center text-2xl items-center border border-gray-400 rounded-lg h-[104px] cursor-pointer shadow hover:bg-gradient-to-t hover:from-blue-100 hover:to-white hover:ring-1 hover:ring-black">
                {loading && <Loader height={"200px"} />}
                {!loading && "+"}
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Add Student</DialogTitle>
              </DialogHeader>
              <form onSubmit={addStudent}>
                <Label htmlFor="name" className="text-right">
                  Student Roll Number
                </Label>
                <Input
                  required
                  type="number"
                  value={rollNo}
                  className="mt-1 mb-2"
                  onChange={(ev) => {
                    setRollNo(ev.target.value);
                  }}
                  name="rollNo"
                  placeholder="Enter Student Roll number"
                />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button type="submit" className="hover:bg-red-500">
                      Add
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
    </>
  );
}

export default AddStudentPopup;
