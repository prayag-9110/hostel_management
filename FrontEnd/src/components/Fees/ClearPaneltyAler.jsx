import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { useStudentContext } from "../../../contexts/StudentContext";
import { useToast } from "@/components/ui/use-toast";
import { Trash2 } from "lucide-react";

function ClearPaneltyAler({ fee }) {
  const { student, setStudent } = useStudentContext();
  const { toast } = useToast();

  async function clearPanelty() {
    try {
      axios
        .post("/accountant/clearPanelty", {
          studentId: student._id,
          feeId: fee._id,
        })
        .then((res) => {
          if (res.status === 200) {
            setStudent(res.data.updatedStudent);
            toast({
              title: "Penalty cleared successfully !!",
            });
          }
        });
    } catch (error) {
      if (error.response.status === 404) {
        toast({
          variant: "destructive",
          title: "Fee not found.",
        });
      }
      if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Oh! Something went wrong.",
        });
      }
    }
  }

  return (
    <div>
      <AlertDialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <AlertDialogTrigger asChild>
                <span className="text-white bg-red-500 p-0.5 rounded-sm hover:ring-2 hover:ring-red-700">
                  <Trash2 size={16} />
                </span>
              </AlertDialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Clear penalty</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-red-500">
              Are you absolutely sure to clear panelty?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action will clear this panelty
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={clearPanelty}>Yes</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ClearPaneltyAler;
