import React, { useEffect, useState } from "react";

import axios from "axios";
import { useStudentContext } from "../../../contexts/StudentContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import BriefStudentProfileCard from "../BriefStudentProfileCard";

function CollectFeeCard() {
  const { toast } = useToast();

  const [rollNumber, setRollNumber] = useState("");
  const { student, setStudent } = useStudentContext();

  useEffect(() => {
    // Cleanup function to clear student data when the component is unmounted
    return () => {
      setStudent("");
    };
  }, []);

  async function getDeatils(ev) {
    ev.preventDefault();
    if (rollNumber === "") {
      if (student) {
        setStudent("");
      } else {
        toast({
          variant: "destructive",
          title: "Please enter roll number please!!!",
        });
      }
    } else {
      try {
        await axios
          .get(`/accountant/getStudentByRollNumber?q=${rollNumber}`)
          .then((res) => {
            if (res.status === 200) {
              setStudent(res.data.student);
              // console.log(student);
            }
          });
      } catch (error) {
        if (error.response.status === 404)
          toast({
            variant: "destructive",
            title: "Student does not exist !!!",
          });
        if (error.response.status === 401)
          toast({
            variant: "destructive",
            title: "Request failed",
          });
        console.log(error);
      }
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Collect Fees </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <form onSubmit={(ev) => getDeatils(ev)}>
              <Label className="m-1">Roll Number</Label>
              <div className="flex flex-row gap-2 items-center relative">
                <Input
                  type="number"
                  id="query"
                  name="rollNumber"
                  value={rollNumber}
                  onChange={(ev) => {
                    setRollNumber(ev.target.value);
                  }}
                  className="shadow appearance-none border rounded-lg w-full lg:w-1/2 py-2 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <Button type="submit" variant="default" size="sm">
                  Get Details
                </Button>
              </div>
            </form>
            <div className="w-full lg:w-1/2">
              <BriefStudentProfileCard student={student} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default CollectFeeCard;
