import * as Yup from "yup";

export const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  firstName: Yup.string()
    .min(2, "At least 2 characters required")
    .max(15, "Maximum 15 characters")
    .matches(/^[a-zA-Z\s]*$/, "Invalid characters in name")
    .required("Name is required"),
  lastName: Yup.string()
    .min(2, "At least 2 characters required")
    .max(15, "Maximum 15 characters")
    .matches(/^[a-zA-Z\s]*$/, "Invalid characters in name")
    .required("Name is required"),
  dateOfBirth: Yup.date().nullable().required("Date of birth is required"),
  cast: Yup.string()
    .min(2, "At least 2 characters required")
    .max(15, "Maximum 15 characters")
    .matches(/^[a-zA-Z\s]*$/, "Invalid characters in name")
    .required("Cast is required"),
  bloodGroup: Yup.string().required("Please select an option"),
  mobileNumber: Yup.string()
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  whatsappNumber: Yup.string()
    .matches(/^\d{10}$/, "Whatsapp number is not valid")
    .required("Whatsapp number number is required"),
  fatherFirstName: Yup.string()
    .min(2, "At least 2 characters required")
    .max(15, "Maximum 15 characters")
    .matches(/^[a-zA-Z\s]*$/, "Invalid characters in name")
    .required("Name is required"),
  fatherMiddlename: Yup.string()
    .min(2, "At least 2 characters required")
    .max(15, "Maximum 15 characters")
    .matches(/^[a-zA-Z\s]*$/, "Invalid characters in name")
    .required("Name is required"),
  fatherPhoneNo: Yup.string()
    .matches(/^\d{10}$/, "Phone number is not valid")
    .required("Phone number is required"),
  fatherWhatsappNo: Yup.string()
    .matches(/^\d{10}$/, "Whatsapp number is not valid")
    .required("Whatsapp number number is required"),
  fatherEmail: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  postalCode: Yup.string()
    .matches(/^\d{6}$/, "Postal code must be 6 digits")
    .required("Postal code is required"),
  village: Yup.string()
    .min(2, "At least 2 characters required")
    .max(15, "Maximum 15 characters")
    .matches(/^[a-zA-Z\s]*$/, "Invalid characters in name")
    .required("village name is required"),
  street: Yup.string().required("Street address is required"),
  lastSchoolName: Yup.string().required("School name is required"),
  lastExamPercentage: Yup.number()
    .required("Exam percentage is required")
    .typeError("Enter a valid number")
    .min(0, "Percentage must be at least 0")
    .max(100, "Percentage must not exceed 100")
    .positive("Percentage must be a positive number"),
  lastExam: Yup.string()
    .min(2, "At least 2 characters required")
    .max(12, "Maximum 10 characters")
    .matches(/^[a-zA-Z\s]*$/, "Invalid characters in name")
    .required("village name is required"),
  work: Yup.string().required("Please select an option"),
  university: Yup.string().required("Please select an option"),
  course: Yup.string().required("Please select an option"),
  district: Yup.string().required("Please select an option"),
  taluka: Yup.string().required("Please select an option"),
  rollNumberRange: Yup.string().required("Please select an option"),
  rollNumber: Yup.string().required("Roll number is required"),
});
