// StudentContext.js
import { createContext, useContext, useState } from "react";

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [student, setStudent] = useState();
  const [subFees, setSubFees] = useState();
  const [dueFees, setDueFees] = useState();

  return (
    <StudentContext.Provider
      value={{ student, setStudent, subFees, setSubFees, dueFees, setDueFees }}
    >
      {children}
    </StudentContext.Provider>
  );
};

export const useStudentContext = () => {
  return useContext(StudentContext);
};
