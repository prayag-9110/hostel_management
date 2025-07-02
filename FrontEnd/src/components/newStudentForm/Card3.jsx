import React, { useState } from "react";
import districts from "@/assets/allDistricts";
import talukasByDistrict from "@/assets/allTalukas";

import {  CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

function Card3({ formik, submitted }) {
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [talukas, setTalukas] = useState([]);

  const handleDistrictChange = (value) => {
    formik.setFieldValue("district", value);
    setSelectedDistrict(value);
    setTalukas(talukasByDistrict[value]);
  };

  const handleTalukaChange = (value) => {
    formik.setFieldValue("taluka", value);
  };

  return (
    <div>
      <CardHeader>
        <CardTitle>Address</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid lg:grid-cols-3 gap-y-6 gap-x-16 pb-2">
          <div className="lg:col-span-2">
            <Label>Street</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="street"
                value={formik.values.street}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.street && formik.errors.street
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("street")}
              />
              <div className="absolute top-10">
                {formik.touched.street && formik.errors.street ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.street}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>District</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Select
                onValueChange={(value) => handleDistrictChange(value)}
                name="district"
                value={formik.values.district}
                onChange={formik.handleChange}
                onOpenChange={() =>
                  formik.handleBlur({ target: { name: "district" } })
                }
                {...formik.getFieldProps("district")}
              >
                <SelectTrigger
                  className={`w-full h-8 border-gray-300 mt-1 ${
                    submitted && formik.errors.district
                      ? "outline outline-1 outline-red-500 "
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {districts.map((district) => (
                      <SelectItem key={district} value={district}>
                        {district}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="absolute top-10">
                {submitted && formik.errors.district ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.district}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Taluka</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Select
                onValueChange={(value) => handleTalukaChange(value)}
                name="taluka"
                value={formik.values.taluka}
                onChange={formik.handleChange}
                onOpenChange={() =>
                  formik.handleBlur({ target: { name: "taluka" } })
                }
                {...formik.getFieldProps("taluka")}
              >
                <SelectTrigger
                  className={`w-full h-8 border-gray-300 mt-1 ${
                    submitted && formik.errors.taluka
                      ? "outline outline-1 outline-red-500 "
                      : ""
                  }`}
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {talukas.map((taluka) => (
                      <SelectItem key={taluka} value={taluka}>
                        {taluka}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              <div className="absolute top-10">
                {submitted && formik.errors.taluka ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.taluka}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Village</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="village"
                value={formik.values.village}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.village && formik.errors.village
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("village")}
              />
              <div className="absolute top-10">
                {formik.touched.village && formik.errors.village ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.village}
                  </div>
                ) : (
                  <div className=""></div>
                )}
              </div>
            </div>
          </div>
          <div>
            <Label>Postal Code</Label>
            <div className="flex flex-row gap-2 items-center relative">
              <Input
                type="text"
                name="postalCode"
                value={formik.values.postalCode}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`mt-1 mb-1 ${
                  formik.touched.postalCode && formik.errors.postalCode
                    ? "outline outline-1 outline-red-500 "
                    : ""
                }`}
                {...formik.getFieldProps("postalCode")}
              />
              <div className="absolute top-10">
                {formik.touched.postalCode && formik.errors.postalCode ? (
                  <div className="ml-1 text-xs text-red-600 font-medium">
                    {formik.errors.postalCode}
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

export default Card3;
