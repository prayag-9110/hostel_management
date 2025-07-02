import React, { useEffect, useState } from "react";
import moment from "moment";
import axios from "axios";
import { useFormik } from "formik";
import { validationSchema } from "./validation";
import { Gift, MessageSquare, PhoneCall } from "lucide-react";
import { useStudentContext } from "../../../../contexts/StudentContext";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import Personal from "./StudentProfile/Personal";
import Address from "./StudentProfile/Address";
import Family from "./StudentProfile/Family";
import Education from "./StudentProfile/Education";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import Loader from "@/components/Loader";

function StudentProfile() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const { student, setStudent } = useStudentContext();

  const formik = useFormik({
    initialValues: {
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth,
      cast: student.cast,
      bloodGroup: student.bloodGroup,
      permenantDisease: student.permenantDisease,
      mobileNumber: student.mobileNumber,
      whatsappNumber: student.whatsappNumber,
      email: student.email,
      fatherFirstName: student.fatherFirstName,
      fatherEmail: student.fatherEmail,
      fatherMiddlename: student.fatherMiddlename,
      work: student.work,
      fatherPhoneNo: student.fatherPhoneNo,
      fatherWhatsappNo: student.fatherWhatsappNo,
      street: student.address.street,
      district: student.address.district,
      taluka: student.address.taluka,
      village: student.address.village,
      postalCode: student.address.postalCode,
      university: student.university,
      course: student.course,
      branch: student.branch,
      lastExam: student.lastExam,
      lastExamPercentage: student.lastExamPercentage,
      lastSchoolName: student.lastSchoolName,
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
      setIsLoading(true);
      try {
        await axios
          .put("admin/updateStudentProfile", {
            rollNumber: student.rollNumber,
            firstName: formik.values.firstName,
            lastName: formik.values.lastName,
            dateOfBirth: formik.values.dateOfBirth,
            cast: formik.values.cast,
            bloodGroup: formik.values.bloodGroup,
            permenantDisease: formik.values.permenantDisease,
            mobileNumber: formik.values.mobileNumber,
            whatsappNumber: formik.values.whatsappNumber,
            email: formik.values.email,
            fatherFirstName: formik.values.fatherFirstName,
            fatherEmail: formik.values.fatherEmail,
            fatherMiddlename: formik.values.fatherMiddlename,
            work: formik.values.work,
            fatherPhoneNo: formik.values.fatherPhoneNo,
            fatherWhatsappNo: formik.values.fatherWhatsappNo,
            street: formik.values.street,
            district: formik.values.district,
            taluka: formik.values.taluka,
            village: formik.values.village,
            postalCode: formik.values.postalCode,
            university: formik.values.university,
            course: formik.values.course,
            branch: formik.values.branch,
            lastExam: formik.values.lastExam,
            lastExamPercentage: formik.values.lastExamPercentage,
            lastSchoolName: formik.values.lastSchoolName,
          })
          .then((res) => {
            if (res.status === 200) {
              setStudent(res.data.UpdatedStudent);
              setIsLoading(false);
              toast({
                title: "Student profile updated successfully",
              });
            }
          });
      } catch (error) {}
    },
  });

  // Update formik's initial values whenever student state changes
  useEffect(() => {
    formik.setValues({
      firstName: student.firstName,
      lastName: student.lastName,
      dateOfBirth: student.dateOfBirth,
      cast: student.cast,
      bloodGroup: student.bloodGroup,
      permenantDisease: student.permenantDisease,
      mobileNumber: student.mobileNumber,
      whatsappNumber: student.whatsappNumber,
      email: student.email,
      fatherFirstName: student.fatherFirstName,
      fatherEmail: student.fatherEmail,
      fatherMiddlename: student.fatherMiddlename,
      work: student.work,
      fatherPhoneNo: student.fatherPhoneNo,
      fatherWhatsappNo: student.fatherWhatsappNo,
      street: student.address.street,
      district: student.address.district,
      taluka: student.address.taluka,
      village: student.address.village,
      postalCode: student.address.postalCode,
      university: student.university,
      course: student.course,
      branch: student.branch,
      lastExam: student.lastExam,
      lastExamPercentage: student.lastExamPercentage,
      lastSchoolName: student.lastSchoolName,
    });
  }, [student]);

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    console.log(formik.errors);
    if (Object.keys(formik.errors).length !== 0) {
      toast({
        variant: "destructive",
        title: "Please fill in all required fields",
      });
    } else {
      console.log("submit");
      console.log(formik.values.dateOfBirth);
      formik.handleSubmit();
    }
  };

  return (
    <div className="pl-2">
      <div className="sm:text-lg md:text-xl lg:text-2xl uppercase font-semibold text-cyan-400 mb-4">
        {student.firstName} {student.fatherFirstName} {student.lastName}
      </div>
      <div className="inline-flex gap-4 text-sm">
        <span className="inline-flex gap-1 items-center">
          <PhoneCall size={18} />
          +91 {student.mobileNumber}
        </span>
        <span className="inline-flex gap-1 items-center text-sm">
          <MessageSquare size={18} />
          +91 {student.whatsappNumber}
        </span>
      </div>
      <div className="mt-2">
        <span
          className="inline-flex gap-2 items-center text-sm font-semibold"
          style={{ color: "red" }}
        >
          <Gift color="red" size={18} />
          {moment(student.dateOfBirth).format("DD-MM-YYYY")}
        </span>
      </div>
      <div className="mt-8">
        <Tabs defaultValue="personal" className="w-full">
          <TabsList
            className={cn(
              "ml-auto justify-start bg-transparent border h-auto pb-0 pl-0 "
            )}
          >
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:rounded-none data-[state=active]:border-cyan-500 text-bg_dark_section transition-none px-6 pb-2 "
              )}
              value="personal"
            >
              Personal
            </TabsTrigger>
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:rounded-none data-[state=active]:border-cyan-500 text-bg_dark_section transition-none px-6 pb-2 "
              )}
              value="address"
            >
              Address
            </TabsTrigger>
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:rounded-none data-[state=active]:border-cyan-500 text-bg_dark_section transition-none px-6 pb-2"
              )}
              value="education"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              className={cn(
                "data-[state=active]:bg-transparent data-[state=active]:border-b-4 data-[state=active]:rounded-none data-[state=active]:border-cyan-500 text-bg_dark_section transition-none px-6 pb-2 "
              )}
              value="family"
            >
              Family
            </TabsTrigger>
          </TabsList>
          <div className="py-4">
            <TabsContent value="personal">
              <Personal formik={formik} />
            </TabsContent>
            <TabsContent value="address">
              <Address formik={formik} />
            </TabsContent>
            <TabsContent value="education">
              <Education formik={formik} />
            </TabsContent>
            <TabsContent value="family">
              <Family formik={formik} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
      <div className="inline-flex gap-3 justify-end w-full pr-4">
        <Button onClick={handleSubmit} type="submit">
          {isLoading ? (
            <>
              <div className="pl-3 pr-2">
                <Loader height="h-auto" width="w-8" />
              </div>
            </>
          ) : (
            <>
              <p>Update</p>
            </>
          )}
        </Button>
      </div>
    </div>
  );
}

export default StudentProfile;
