import React, { useState } from "react";
// Components
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

function Card1({ formik, submitted }) {
  const [birthDate, setBirthDate] = useState();

  const handleBloodGroupChange = (value) => {
    formik.setFieldValue("bloodGroup", value);
  };

  const handleBirthDateChange = (value) => {
    formik.setFieldValue("dateOfBirth", value);
    setBirthDate(value);
  };

  return (
    <div>
      <CardHeader>
        <CardTitle>Personal Details</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-y-6 gap-x-16 pb-2">
          <div>
            <Label>First name</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="firstName"
                value={formik.values.firstName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.firstName && formik.errors.firstName
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("firstName")}
              />
              <div className="absolute top-10">
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.firstName}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Last name</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="lastName"
                value={formik.values.lastName}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.lastName && formik.errors.lastName
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("lastName")}
              />
              <div className="absolute top-10">
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.lastName}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Date of birth</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                className={`duration-box mt-1 ${
                  formik.touched.dateOfBirth && formik.errors.dateOfBirth
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                type="date"
                name="dateOfBirth"
                placeholder="Select found date"
                value={formik.values.dateOfBirth}
                max={new Date().toISOString().split("T")[0]}
                onChange={(value) => handleBirthDateChange(value)}
                onBlur={formik.handleBlur}
                {...formik.getFieldProps("dateOfBirth")}
              ></Input>
              <div className="absolute top-10">
                {formik.touched.dateOfBirth && formik.errors.dateOfBirth ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.dateOfBirth}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Cast</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="cast"
                value={formik.values.cast}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.cast && formik.errors.cast
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("cast")}
              />
              <div className="absolute top-10">
                {formik.touched.cast && formik.errors.cast ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.cast}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Blood Group</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Select
                onValueChange={(value) => handleBloodGroupChange(value)}
                name="bloodGroup"
                value={formik.values.bloodGroup}
                onChange={formik.handleChange}
                onOpenChange={() =>
                  formik.handleBlur({ target: { name: "bloodGroup" } })
                }
                {...formik.getFieldProps("bloodGroup")}
              >
                <SelectTrigger
                  className={`w-full h-8 border-gray-300 mt-1 ${
                    submitted && formik.errors.bloodGroup
                      ? "outline outline-1 outline-red-500 "
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="A+">A+</SelectItem>
                    <SelectItem value="A-">A-</SelectItem>
                    <SelectItem value="B+">B+</SelectItem>
                    <SelectItem value="B-">B-</SelectItem>
                    <SelectItem value="O+">O+</SelectItem>
                    <SelectItem value="O-">O-</SelectItem>
                    <SelectItem value="AB+">AB+</SelectItem>
                    <SelectItem value="AB-">AB+</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="absolute top-10">
                {submitted && formik.errors.bloodGroup ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.bloodGroup}
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
                name="mobileNumber"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.mobileNumber && formik.errors.mobileNumber
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("mobileNumber")}
              />
              <div className="absolute top-10">
                {formik.touched.mobileNumber && formik.errors.mobileNumber ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.mobileNumber}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Whatsapp number</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="whatsappNumber"
                value={formik.values.whatsappNumber}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.whatsappNumber && formik.errors.whatsappNumber
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("whatsappNumber")}
              />
              <div className="absolute top-10">
                {formik.touched.whatsappNumber &&
                formik.errors.whatsappNumber ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.whatsappNumber}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Email address</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.email && formik.errors.email
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("email")}
              />
              <div className="absolute top-10">
                {formik.touched.email && formik.errors.email ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.email}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>
              Permanent diseases
              <span className="text-xs text-red-500"> (if any)</span>
            </Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                name="permenantDisease"
                value={formik.values.permenantDisease}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1`}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </div>
  );
}

export default Card1;
