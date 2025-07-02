import React, { useState } from "react";
import axios from "axios";
import moment from "moment";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DateRangePicker from "./DateRangePicker";
import { useToast } from "@/components/ui/use-toast";
import RollNumberInput from "../RollNumberInput";

function BulkLeaveCard() {
  const { toast } = useToast();

  const [rollNumbers, setRollNumbers] = useState([]);
  const [reason, setReason] = useState("");
  const [date, setDate] = useState({ from: "", to: "" });

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      await axios
        .post("/leave/applyBulklLeave", {
          rollNumbers,
          startDate: moment(date.from).format("DD-MM-YYYY"),
          endDate: moment(date.to).format("DD-MM-YYYY"),
          reason,
        })
        .then((res) => {
          if (res.status === 200) {
            toast({
              title: "Leave submited successfully !!",
            });
          }
        });
    } catch (error) {
      if (error.response.status === 404) {
        toast({
          variant: "destructive",
          title: "Students not found !! .",
        });
      }
      if (error.response.status === 500) {
        toast({
          variant: "destructive",
          title: "Oh! something went wrong. Submit Failed !! .",
        });
      }
    }
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Bulk Leave</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10">
              <div className="flex flex-row items-center gap-2 lg:col-span-2">
                <Label>Roll&nbsp;Numbers:</Label>
                <RollNumberInput
                  rollNumbers={rollNumbers}
                  setRollNumbers={setRollNumbers}
                />
              </div>
              <div className="flex flex-row items-center gap-2">
                <Label>Date&nbsp;Range:</Label>
                <DateRangePicker setDate={setDate} date={date} />
              </div>
              <div className="flex flex-row items-center gap-2">
                <Label>Reason: </Label>
                <Input
                  type="text"
                  id="reason"
                  name="reason"
                  value={reason}
                  onChange={(ev) => {
                    setReason(ev.target.value);
                  }}
                  required
                />
              </div>
            </div>
            <div className="flex flex-row justify-center items-center w-full gap-4 mt-10">
              <Button variant="destructive" type="submit">
                Submit
              </Button>
              <Button
                type="button"
                size="lg"
                onClick={() => {
                  setRollNumbers([]);
                  setReason("");
                  setDate({ from: "", to: "" });
                }}
              >
                Clear
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default BulkLeaveCard;
