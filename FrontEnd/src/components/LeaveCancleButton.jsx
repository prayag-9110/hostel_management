import React from "react";
import axios from "axios";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { useStudentContext } from "../../contexts/StudentContext";

function LeaveCancleButton({ leaveId }) {
  const { toast } = useToast();
  const { student, setStudent } = useStudentContext();

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      await axios
        .post("/leave/cancelLeave", {
          leaveId,
          studentId: student._id,
        })
        .then((res) => {
          if (res.status === 200) {
            toast({
              title: "Leave canceled successfully.",
            });
            setStudent(res.data.updatedStudent);
          }
        });
    } catch (error) {
      if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Leave cancelation failed.",
        });
      }
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button
          size="sm"
          className="bg-red-500 cursor-pointer text-white text-xs h-8 rounded-md px-2 flex items-center hover:bg-red-500/90 hover:ring-1 hover:ring-red-700"
        >
          <div className="ml-1">Cancel</div>
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-500">
            Are you absolutely sure to cancel this leave?
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>No</AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSubmit}
          >
            Yes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default LeaveCancleButton;
