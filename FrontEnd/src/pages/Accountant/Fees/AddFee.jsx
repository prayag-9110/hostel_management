import React, { useState, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../../contexts/UserContext";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import BriefStudentProfileCard from "@/components/BriefStudentProfileCard";

function AddFee() {
  const { toast } = useToast();
  const [amount, setAmount] = useState();
  const [semester, setSemester] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [feesFor, setFeesFor] = useState("");
  const [query, setQuery] = useState("");
  const [suggestionStudents, setSuggestionStudents] = useState([]);
  const [searchedStudent, setSearchedStudent] = useState();
  const [clearSuggestions, setClearSuggestions] = useState(false);

  const { user, setUser } = useContext(UserContext);

  async function handleSubmit(ev) {
    ev.preventDefault();
    try {
      await axios
        .post("/accountant/addNewFee", {
          amount,
          semester,
          dueDate,
          feesFor,
          rollNumber: query,
        })
        .then((res) => {
          if (res.status === 200) {
            toast({
              title: "Fee added successfully !!",
            });
          }
        });
    } catch (error) {
      if (error.response.status === 400) {
        toast({
          variant: "destructive",
          title: "Oh! something went wrong. Submit Failed !! .",
        });
      }
    }
  }

  useEffect(() => {
    if (query.length === 0) {
      setSuggestionStudents([]);
      return;
    } else {
      if (!clearSuggestions) {
        axios
          .get(`/admin/getSearchSuggestionStudents?q=${query}`)
          .then((res) => {
            const data = res.data.students;
            setSuggestionStudents(data);
          });
      }
      setClearSuggestions(false);
    }
  }, [query]);

  async function handleSeachedStudent(student) {
    setSearchedStudent(student);
    setClearSuggestions(true);
    setQuery(student.rollNumber);
    setSuggestionStudents([]); // This will be called after setQuery finishes
  }
  
  if (!user || (user && user.role !== "Accountant")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Add Fee Master</CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <form onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-y-6 gap-x-32">
                <div>
                  <Label className="font-medium">Fees for</Label>
                  <Select
                    onValueChange={(value) => setFeesFor(value)}
                    required="true"
                  >
                    <SelectTrigger
                      className={`w-full h-8 border-gray-300 mt-1 `}
                    >
                      <SelectValue placeholder="Select fee for" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="all">All students</SelectItem>
                        <SelectItem value="new">Only new admissions</SelectItem>
                        <SelectItem value="personal">Personally</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-medium">Due Date</Label>
                  <Input
                    required
                    className="mt-1"
                    type="date"
                    onChange={(ev) => {
                      setDueDate(ev.target.value);
                    }}
                    min={new Date().toISOString().split("T")[0]}
                  />
                </div>
                <div>
                  <Label className="font-medium">Semester</Label>
                  <Select onValueChange={(value) => setSemester(value)}>
                    <SelectTrigger
                      className={`w-full h-8 border-gray-300 mt-1 `}
                    >
                      <SelectValue placeholder="Select semester" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
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
                <div>
                  <Label className="font-medium">Amount</Label>
                  <Input
                    type="number"
                    name="amount"
                    className={`mt-1 mb-1`}
                    placeholder="Enter amount"
                    onChange={(ev) => {
                      setAmount(ev.target.value);
                    }}
                    required
                  />
                </div>
                {feesFor === "personal" ? (
                  <>
                    <div>
                      <Label className="font-medium">Search Student</Label>
                      <div className="relative">
                        <Input
                          type="text"
                          id="query"
                          name="query"
                          value={query}
                          onChange={(ev) => {
                            setQuery(ev.target.value);
                          }}
                          className={`mt-1 mb-1`}
                          required
                        />
                        <div className="absolute w-full">
                          <div className="flex flex-col">
                            {suggestionStudents &&
                              query.length != 0 &&
                              suggestionStudents
                                .slice(0, 3)
                                .map((student, index) => (
                                  <div
                                    className="cursor-pointer"
                                    onClick={() => {
                                      handleSeachedStudent(student);
                                    }}
                                  >
                                    <BriefStudentProfileCard
                                      student={student}
                                    />
                                  </div>
                                ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <></>
                )}
                <div>
                  <BriefStudentProfileCard student={searchedStudent} />
                </div>
              </div>
              <div className="mt-10 flex justify-center">
                <Button type="submit" size="lg">
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddFee;
