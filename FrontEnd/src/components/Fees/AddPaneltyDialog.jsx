import React, { useEffect, useState } from "react";
import axios from "axios";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useStudentContext } from "../../../contexts/StudentContext";
import { Plus } from "lucide-react";

function AddPaneltyDialog({ fee }) {
  const { toast } = useToast();
  const [amount, setAmount] = useState("");
  const [addbtn, setAddbtn] = useState(false);
  const { student, setStudent } = useStudentContext();

  useEffect(() => {
    if (amount === "") {
      setAddbtn(false);
    } else {
      setAddbtn(true);
    }
  }, [amount]);

  async function addPanelty(ev) {
    ev.preventDefault();
    try {
      axios
        .post("/accountant/addPanelty", {
          studentId: student._id,
          feeId: fee._id,
          penaltyAmount: amount,
        })
        .then((res) => {
          if (res.status === 200) {
            setAmount();
            setStudent(res.data.updatedStudent);
            setAddbtn(false);
            toast({
              title: "Penalty added successfully !!",
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
      <Dialog>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <DialogTrigger asChild>
                <span className="bg-green-400 text-white p-0.5 space-y-1 rounded-sm hover:ring-2 hover:ring-green-600">
                  <Plus size={16} />
                </span>
              </DialogTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add penalty</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>
              <span>Add Panelty</span>
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={addPanelty}>
            <div>
              <Label className="m-1">Amount</Label>
              <div className="flex flex-row gap-2 items-center">
                <Input
                  type="number"
                  id="amount"
                  name="amount"
                  value={amount}
                  onChange={(ev) => {
                    setAmount(ev.target.value);
                  }}
                  className={`border-gray-400`}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button className="mt-6 px-4" variant="secondary" size="sm">
                  Close
                </Button>
              </DialogClose>
              {addbtn ? (
                <DialogClose asChild>
                  <Button
                    type="submit"
                    variant="default"
                    size="sm"
                    className={`mt-6 px-6`}
                  >
                    Add
                  </Button>
                </DialogClose>
              ) : (
                <Button
                  type="text"
                  disabled={addbtn}
                  variant="default"
                  size="sm"
                  className={`mt-6 px-6 ${addbtn ? "" : "cursor-not-allowed"}`}
                >
                  Add
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default AddPaneltyDialog;
