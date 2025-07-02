import React, { useState } from "react";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";

import { validationSchema } from "./validation";
import { UserContext } from "../../../contexts/UserContext";
import Card1 from "@/components/newStudentForm/Card1";
import Card2 from "@/components/newStudentForm/Card2";
import Card3 from "@/components/newStudentForm/Card3";
import Card4 from "@/components/newStudentForm/Card4";
import Card5 from "@/components/newStudentForm/Card5";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Loader from "@/components/Loader";

function AddStudent() {
  const { toast } = useToast();
  const { user, setUser } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const formik = useFormik({
    initialValues: {
      rollNumber: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      cast: "",
      bloodGroup: "",
      mobileNumber: "",
      whatsappNumber: "",
      email: "",
      fatherFirstName: "",
      fatherEmail: "",
      fatherMiddlename: "",
      work: "",
      fatherPhoneNo: "",
      fatherWhatsappNo: "",
      street: "",
      district: "",
      taluka: "",
      village: "",
      postalCode: "",
      university: "",
      course: "",
      branch: "",
      lastExam: "",
      lastExamPercentage: "",
      lastSchoolName: "",
      rollNumberRange: "",
      permenantDisease: "",
      profilePhoto: "",
    },
    validationSchema: validationSchema,
    onSubmit: async ({ resetForm }) => {
      try {
        const formData = new FormData();
        formData.append("rollNumber", formik.values.rollNumber);
        formData.append("firstName", formik.values.firstName);
        formData.append("lastName", formik.values.lastName);
        formData.append("dateOfBirth", formik.values.dateOfBirth);
        formData.append("cast", formik.values.cast);
        formData.append("bloodGroup", formik.values.bloodGroup);
        formData.append("mobileNumber", formik.values.mobileNumber);
        formData.append("whatsappNumber", formik.values.whatsappNumber);
        formData.append("email", formik.values.email);
        formData.append("fatherFirstName", formik.values.fatherFirstName);
        formData.append("fatherEmail", formik.values.fatherEmail);
        formData.append("fatherMiddlename", formik.values.fatherMiddlename);
        formData.append("work", formik.values.work);
        formData.append("fatherPhoneNo", formik.values.fatherPhoneNo);
        formData.append("fatherWhatsappNo", formik.values.fatherWhatsappNo);
        formData.append("street", formik.values.street);
        formData.append("district", formik.values.district);
        formData.append("taluka", formik.values.taluka);
        formData.append("village", formik.values.village);
        formData.append("postalCode", formik.values.postalCode);
        formData.append("university", formik.values.university);
        formData.append("course", formik.values.course);
        formData.append(
          "branch",
          formik.values.branch ? formik.values.branch : formik.values.course
        );
        formData.append("lastExam", formik.values.lastExam);
        formData.append("lastExamPercentage", formik.values.lastExamPercentage);
        formData.append("lastSchoolName", formik.values.lastSchoolName);
        formData.append("permenantDisease", formik.values.permenantDisease);
        formData.append("profilePhoto", formik.values.profilePhoto);

        setIsLoading(true);

        await axios
          .post("/admin/createstudent", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              toast({
                title: "Student Successfully created",
              });
              setSubmitted(false);
              setIsLoading(false);
            } else {
              setIsLoading(false);
              toast({
                variant: "destructive",
                title: "Failed to create student",
              });
            }
          })
          .catch((err) => {
            toast({
              variant: "destructive",
              title: "Failed to create student",
            });
            setIsLoading(false);
          });
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Failed to create student",
        });
        setIsLoading(false);
      }
    },
  });

  const handleClearForm = (ev) => {
    ev.preventDefault();
    formik.resetForm();
    setSubmitted(false);
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    setSubmitted(true);
    console.log(formik.errors);
    if (Object.keys(formik.errors).length !== 0) {
      toast({
        variant: "destructive",
        title: "Please fill in all required fields",
      });
    } else {
      console.log("submit");
      formik.handleSubmit();
    }
  };

  if (!user || (user && user.role !== "Admin")) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      <div className="p-6 lg:p-8 containerX">
        <h1 className="lg:text-3xl text-2xl font-bold text-bg_dark_section mb-5 mx-2">
          📝 New Admission Form
        </h1>
        <form className="flex flex-col">
          <div className="flex flex-col gap-y-8">
            <div>
              <Card>
                <Card1 formik={formik} submitted={submitted} />
              </Card>
            </div>
            <div className="col-span-2">
              <Card>
                <Card2 formik={formik} submitted={submitted} />
              </Card>
            </div>
            <div className="col-span-2 col-start-2 row-start-2">
              <Card>
                <Card3 formik={formik} submitted={submitted} />
              </Card>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row my-8 gap-8 w-full">
            <div className="w-full">
              <Card>
                <Card4 formik={formik} submitted={submitted} />
              </Card>
            </div>
            <div className="w-3/5">
              <Card>
                <Card5 formik={formik} submitted={submitted} />
              </Card>
            </div>
          </div>
          <div className="flex flex-row justify-center items-center w-full gap-4">
            <Button
              size="lg"
              variant="destructive"
              onClick={handleSubmit}
              type="submit"
            >
              {isLoading ? (
                <>
                  <div className="pl-8 pr-5">
                    <Loader height="auto" width="w-8" />
                  </div>
                </>
              ) : (
                <>
                  <p>Add Student</p>
                </>
              )}
            </Button>
            <Button size="lg" onClick={handleClearForm}>
              Clear
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default AddStudent;
