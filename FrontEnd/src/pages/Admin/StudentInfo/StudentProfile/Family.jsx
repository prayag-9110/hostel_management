import React from "react";

import { CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function Family({ formik }) {
  const handleWorkTypeChange = (value) => {
    formik.setFieldValue("work", value);
  };
  return (
    <div className="border-2">
      <CardHeader>
        <CardTitle>Father's Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-y-6 gap-x-16 pb-2">
          <div>
            <Label>First name</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="fatherFirstName"
                value={formik.values.fatherFirstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.fatherFirstName &&
                  formik.errors.fatherFirstName
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("fatherFirstName")}
              />
              <div className="absolute top-10">
                {formik.touched.fatherFirstName &&
                formik.errors.fatherFirstName ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.fatherFirstName}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Grandfather name</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="fatherMiddlename"
                value={formik.values.fatherMiddlename}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.fatherMiddlename &&
                  formik.errors.fatherMiddlename
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("fatherMiddlename")}
              />
              <div className="absolute top-10">
                {formik.touched.fatherMiddlename &&
                formik.errors.fatherMiddlename ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.fatherMiddlename}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Phone number</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="fatherPhoneNo"
                value={formik.values.fatherPhoneNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.fatherPhoneNo && formik.errors.fatherPhoneNo
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("fatherPhoneNo")}
              />
              <div className="absolute top-10">
                {formik.touched.fatherPhoneNo && formik.errors.fatherPhoneNo ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.fatherPhoneNo}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Whatsapp Number</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="fatherWhatsappNo"
                value={formik.values.fatherWhatsappNo}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.fatherWhatsappNo &&
                  formik.errors.fatherWhatsappNo
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("fatherWhatsappNo")}
              />
              <div className="absolute top-10">
                {formik.touched.fatherWhatsappNo &&
                formik.errors.fatherWhatsappNo ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.fatherWhatsappNo}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Email adress</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="fatherEmail"
                value={formik.values.fatherEmail}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.fatherEmail && formik.errors.fatherEmail
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("fatherEmail")}
              />
              <div className="absolute top-10">
                {formik.touched.fatherEmail && formik.errors.fatherEmail ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.fatherEmail}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Work type</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Select
                onValueChange={(value) => handleWorkTypeChange(value)}
                name="work"
                value={formik.values.work}
                onOpenChange={() =>
                  formik.handleBlur({ target: { name: "work" } })
                }
                {...formik.getFieldProps("work")}
              >
                <SelectTrigger
                  className={`w-full h-8 border-gray-300 mt-1 ${
                    formik.errors.work
                      ? "outline outline-1 outline-red-500 "
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="job">Job</SelectItem>
                    <SelectItem value="buiseness">Buiseness</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="absolute top-10">
                {formik.errors.work ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.work}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

export default Family;
