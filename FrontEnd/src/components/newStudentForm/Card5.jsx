import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "../ui/button";

function Card5({ formik, submitted }) {
  // const [photo, setPhoto] = useState("");
  const [range, setRange] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleRangeChange = async (value) => {
    formik.setFieldValue("rollNumberRange", value);
    setRange(value);
    console.log(range);
  };

  async function generateRollNumber(ev) {
    ev.preventDefault(ev);

    setIsGenerating(true);

    if (range === "") {
      toast.error("Please select roll number range");
    } else {
      try {
        await axios
          .post("/admin/generateRollNumber", {
            range: range,
          })
          .then((res) => {
            const rno = res.data.rollNumber;
            setTimeout(() => {
              formik.setFieldValue("rollNumber", rno);
              setIsGenerating(false);
            }, 1500);
          });
      } catch (error) {
        toast.error("Error while generating roll number");
      }
    }
  }

  return (
    <div>
      <CardHeader>
        <CardTitle>Assign roll number</CardTitle>
      </CardHeader>
      <CardContent>
        <Label>Choose range</Label>
        <div className="flex flex-row gap-2 items-center relative">
          <Select
            onValueChange={(value) => handleRangeChange(value)}
            name="rollNumberRange"
            value={formik.values.rollNrollNumberRangeumber}
            onChange={formik.handleChange}
            onOpenChange={() =>
              formik.handleBlur({ target: { name: "rollNumberRange" } })
            }
            {...formik.getFieldProps("rollNumberRange")}
          >
            <SelectTrigger
              className={`w-full h-8 border-gray-300 mt-1 ${
                submitted && formik.errors.rollNumberRange
                  ? "outline outline-1 outline-red-500 "
                  : ""
              }`}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="101-199">101-199</SelectItem>
                <SelectItem value="201-299">101-299</SelectItem>
                <SelectItem value="301-399">301-399</SelectItem>
                <SelectItem value="401-499">401-499</SelectItem>
                <SelectItem value="501-599">501-599</SelectItem>
                <SelectItem value="601-699">601-699</SelectItem>
                <SelectItem value="701-799">701-799</SelectItem>
                <SelectItem value="801-899">801-899</SelectItem>
                <SelectItem value="901-999">901-999</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <div className="absolute top-10">
            {submitted && formik.errors.rollNumberRange ? (
              <div className="ml-1 text-xs text-red-600 font-medium">
                {formik.errors.rollNumberRange}
              </div>
            ) : (
              <div className=""></div>
            )}
          </div>
        </div>
        <div className="my-6">
          <span>
            <Label>Roll number</Label>
            <span className="text-xs text-red-500">
              {" "}
              (Select range before generate)
            </span>
          </span>
          <div className="flex flex-row gap-2 items-center relative">
            <Input
              type="text"
              name="rollNumber"
              value={formik.values.rollNumber}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`mt-1 mb-1 ${
                formik.touched.rollNumber && formik.errors.rollNumber
                  ? "outline outline-1 outline-red-500 "
                  : ""
              }`}
              {...formik.getFieldProps("rollNumber")}
            />
            <div className="absolute top-10">
              {formik.touched.rollNumber && formik.errors.rollNumber ? (
                <div className="ml-1 text-xs text-red-600 font-medium">
                  {formik.errors.rollNumber}
                </div>
              ) : (
                <div className=""></div>
              )}
            </div>
            <button
              className="bg-bg_dark_section text-sm text-white py-1 px-2 rounded-md flex flex-col items-center justify-center w-24"
              onClick={generateRollNumber}
            >
              {isGenerating ? (
                <svg
                  aria-hidden="true"
                  className="w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="currentFill"
                  />
                </svg>
              ) : (
                "Generate"
              )}
            </button>
          </div>
        </div>
        <CardTitle className="py-3">Upload profile picture</CardTitle>
        <Input
          type="file"
          onChange={(ev) => {
            // setPhoto(ev.target.files[0]);
            formik.setFieldValue("profilePhoto", ev.target.files[0]);
          }}
          name="photo"
          className="mt-1 mb-2 bg-slate-200 cursor-pointer"
        />
      </CardContent>
    </div>
  );
}

export default Card5;
