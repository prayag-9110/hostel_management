import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

// Components
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import DateRangePicker from "./DateRangePicker";
import { useToast } from "@/components/ui/use-toast";
import BriefStudentProfileCard from "../BriefStudentProfileCard";

function PersonalLeaveCard() {
  const { toast } = useToast();

  const [rollNumber, setRollNumber] = useState("");
  const [reason, setReason] = useState("");
  const [suggestionStudents, setSuggestionStudents] = useState([]);
  const [searchedStudent, setSearchedStudent] = useState();
  const [clearSuggestions, setClearSuggestions] = useState(false);
  const [date, setDate] = useState({ from: "", to: "" });

  useEffect(() => {
    if (rollNumber.length === 0) {
      setSuggestionStudents([]);
      return;
    } else {
      if (!clearSuggestions) {
        axios
          .get(`/admin/getSearchSuggestionStudents?q=${rollNumber}`)
          .then((res) => {
            const data = res.data.students;
            setSuggestionStudents(data);
          });
      }
      setClearSuggestions(false);
    }
  }, [rollNumber]);

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
 
      await axios
        .post("/leave/applyPersonalLeave", {
          rollNumber,
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
          title: "Student not found !! .",
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

  async function handleSeachedStudent(student) {
    setSearchedStudent(student);
    setClearSuggestions(true);
    setRollNumber(student.rollNumber);
    setSuggestionStudents([]); // This will be called after setQuery finishes
  }

  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Personal Leave</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-y-6 gap-x-10">
              <div className="flex flex-row items-center gap-2">
                <Label>Roll&nbsp;Number:</Label>
                <div className="relative w-full">
                  <Input
                    type="text"
                    id="rollNumber"
                    name="rollNumber"
                    value={rollNumber}
                    onChange={(ev) => {
                      setRollNumber(ev.target.value);
                    }}
                    required
                  />
                  <div className="absolute w-full">
                    <div className="flex flex-col">
                      {suggestionStudents &&
                        rollNumber.length != 0 &&
                        suggestionStudents.slice(0, 3).map((student, index) => (
                          <div
                            key={index}
                            className="cursor-pointer"
                            onClick={() => {
                              handleSeachedStudent(student);
                            }}
                          >
                            <BriefStudentProfileCard student={student} />
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-row items-center gap-3">
                <Label>Date&nbsp;Range:</Label>
                <DateRangePicker setDate={setDate} date={date} />
              </div>
              <div className="flex flex-row items-center gap-11">
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
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default PersonalLeaveCard;
