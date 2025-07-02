import React, { useEffect, useState } from "react";
import axios from "axios";
import { useStudentContext } from "../../../contexts/StudentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

function DueFeeCard() {
  const { toast } = useToast();
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const { setDueFees } = useStudentContext();

  async function getDeatils(ev) {
    ev.preventDefault();
    try {
      await axios
        .post("/accountant/getDueFeeStudent", {
          year: year,
          semester: semester,
        })
        .then((res) => {
          if (res.status === 200) {
            setDueFees(res.data.feesArray);
            console.log(res.data.feesArray);
          }
        });
    } catch (error) {
      if (error.response.status === 404)
        toast({
          variant: "destructive",
          title: "Student does not exist !!!",
        });
      if (error.response.status === 401) toast.error("Request failed");
      console.log(error);
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Search Due Fees</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={(ev) => getDeatils(ev)}>
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-row items-center gap-3">
                <Label className="font-medium">Year:</Label>
                <Select onValueChange={(value) => setYear(value)}>
                  <SelectTrigger className={`w-full h-8 border-gray-300 mt-1 `}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="2024">2024</SelectItem>
                      <SelectItem value="2025">2025</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex flex-row items-center gap-3">
                <Label className="font-medium">Semester:</Label>
                <Select onValueChange={(value) => setSemester(value)}>
                  <SelectTrigger className={`w-full h-8 border-gray-300 mt-1 `}>
                    <SelectValue placeholder="Select semester" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Both">Both</SelectItem>
                      <SelectItem value="First Semester">
                        First Semester
                      </SelectItem>
                      <SelectItem value="Second Semester">
                        Second Semester
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" variant="default" size="sm">
                Apply Filter
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default DueFeeCard;
