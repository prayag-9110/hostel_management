import React, { useState } from "react";
import { properties } from "./properties";
import { useStudentContext } from "../../../../contexts/StudentContext";

import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import moment from "moment/moment";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";

function NOC() {
  const { toast } = useToast();
  const { student } = useStudentContext();
  const [checkedProperities, setCheckedProperities] = useState([]);
  const [remark, setRemark] = useState("");
  const [propertyFine, SetpropertyFine] = useState("");
  const [date, setDate] = useState();

  async function handleOnChange(value, label) {
    if (value) {
      checkedProperities.push(label);
    } else {
      setCheckedProperities(
        checkedProperities.filter((item) => item !== label)
      );
    }
    console.log(checkedProperities);
  }

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      await axios
        .post("/admin/applyNOC", {
          studentId: student._id,
          damagedProperties: checkedProperities,
          propertyFine: propertyFine,
          remark: remark,
          date: date,
        })
        .then((res) => {
          if (res.status === 200) {
            setCheckedProperities([]);
            setRemark("");
            SetpropertyFine("");
            setDate("");
            toast({
              title: "NOC applied successfully",
            });
          }
        });
    } catch (error) {
      if (error.response.status === 409) {
        toast({
          variant: "destructive",
          title: "There are pending fees of student",
        });
      }
      if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "NOC Apllication Failed!!",
        });
      }
    }
  }

  return (
    <div className="p-4 border">
      <div className="text-xl font-semibold mb-8">Apply NOC</div>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-12">
          <div className="flex flex-col gap-2">
            <div>Property Damage</div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-gray-700">
              {properties &&
                properties.map((propertie, index) => (
                  <>
                    <div
                      key={index}
                      className="flex flex-row items-center gap-1 text-sm"
                    >
                      <Checkbox
                        value={propertie._id}
                        onCheckedChange={(value) => {
                          handleOnChange(value, propertie.label);
                        }}
                      />
                      <label>{propertie.label}</label>
                    </div>
                  </>
                ))}
            </div>
          </div>
          <div>
            Remark :
            <textarea
              className="flex min-h-[60px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              value={remark}
              onChange={(e) => setRemark(e.target.value)}
            />
          </div>
          <div>
            <Label>Property Fine</Label>
            <Input
              type="input"
              name="propertyFine"
              value={propertyFine}
              onChange={(e) => SetpropertyFine(e.target.value)}
              className={"mt-1 mb-1"}
            />
          </div>
          <div className="flex flex-col">
            <Label>Apply Date</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 mt-1 text-left justify-start items-center font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  {date ? (
                    moment(date).format("DD-MM-YYYY")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon size={16} className="ml-2" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={(value) => setDate(value)}
                  disabled={(date) =>
                    date > new Date() || date < new Date("1900-01-01")
                  }
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <div className="flex justify-end mr-8 mt-8">
          <Button type="submit" className="bg-green-500 hover:bg-green-500/80">
            Apply Noc
          </Button>
        </div>
      </form>
    </div>
  );
}

export default NOC;
