// StudentContext.js
import { createContext, useContext, useState } from "react";

const BlockContext = createContext();

export const BlockProvider = ({ children }) => {
  const [blocks, setBlocks] = useState([]);

  return (
    <BlockContext.Provider value={{ blocks, setBlocks }}>
      {children}
    </BlockContext.Provider>
  );
};

export const useBlockContext = () => {
  return useContext(BlockContext);
};
