import { createContext, useContext, useState } from "react";

const ReportContext = createContext();

export const ReportProvider = ({ children }) => {
  const [reportChanged, setReportChanged] = useState(0);
  return (
    <ReportContext.Provider value={{ reportChanged, setReportChanged }}>
      {children}
    </ReportContext.Provider>
  );
};

export const useReportContext = () => {
  return useContext(ReportContext);
};
