import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { IndianRupee, Send } from "lucide-react";
import { useStudentContext } from "../../../contexts/StudentContext";

function CollectFeeDialog({ fee, setReceiptLoading }) {
  const { toast } = useToast();
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState("");
  const [buttonDisable, setButtonDisable] = useState(false);
  const { student, setStudent, setSubFees } = useStudentContext();

  useEffect(() => {
    // Use useEffect to set buttonDisable after the component mounts
    if (fee.amount === fee.totalAmountPaid) {
      setButtonDisable(true);
    } else {
      setButtonDisable(false);
    }
  }, [fee.amount, fee.totalAmountPaid]);

  async function addFee(ev) {
    ev.preventDefault();

    try {
      await axios
        .post("/accountant/collectFee", {
          studentId: student._id,
          feeId: fee._id,
          amount,
          date,
        })
        .then((res) => {
          if (res.status === 200) {
            setStudent(res.data.updatedStudent);
            setSubFees(res.data.feeObject.paidAmount);
            // seting states for loading for receipt generation
            setReceiptLoading(
              res.data.feeObject.paidAmount
                ? new Array(res.data.feeObject.paidAmount.length).fill(false)
                : []
            );
            toast({
              title: "Payment Added successfully.",
            });
          }
        });
    } catch (error) {
      if (error.response.status === 403) {
        toast({
          variant: "destructive",
          title: "Please add amount less than balance amount.",
        });
      }
      if (error.response.status === 400) toast.error("Submit Failed");
    }
  }

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <button
            disabled={buttonDisable}
            size="sm"
            className={`bg-blue-500 cursor-pointer text-white text-xs h-10 rounded-md px-2 hover:bg-blue-500/90 hover:ring-2 hover:ring-blue-700 flex items-center ${
              buttonDisable ? "hover:cursor-not-allowed" : ""
            }`}
          >
            <IndianRupee size={14} />
            <div>Collect fees</div>
          </button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <span>Fee Details </span>
              <span className="text-base text-red-500 font-normal">
                ( {fee.year}-{fee.semester} )
              </span>
            </DialogTitle>
            <DialogDescription>
              Add amount and date of payment
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={addFee}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Amount
                </Label>
                <Input
                  required
                  id="amount"
                  type="number"
                  className="col-span-3"
                  onChange={(ev) => setAmount(ev.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="username" className="text-right">
                  Date
                </Label>
                <Input
                  required
                  className="w-[278px]"
                  type="date"
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(ev) => setDate(ev.target.value)}
                  placeholder="Select date"
                />
              </div>
            </div>
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

export default CollectFeeDialog;
