import { X } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";

import { useToast } from "@/components/ui/use-toast";

const RollNumberInput = ({ rollNumbers, setRollNumbers }) => {
  const [inputValue, setInputValue] = useState("");

  const inputRef = useRef(null);
  const { toast } = useToast();

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      // On Enter key, add the roll number to the array, clear the input field, and focus on the input
      event.preventDefault();
      addRollNumber();
      inputRef.current.focus();
    }
  };

  const addRollNumber = () => {
    const trimmedValue = inputValue.trim();
    if (/^\d{3}$/.test(trimmedValue)) {
      if (!rollNumbers.includes(trimmedValue)) {
        setRollNumbers([...rollNumbers, trimmedValue]);
        setInputValue("");
      } else {
        toast({
          variant: "destructive",
          title: `Roll number ${trimmedValue} already exists.`,
        });
      }
    } else {
      toast({
        variant: "destructive",
        title: "Roll number must be three digits.",
      });
    }
  };

  const removeRollNumber = (index) => {
    const updatedRollNumbers = [...rollNumbers];
    updatedRollNumbers.splice(index, 1);
    setRollNumbers(updatedRollNumbers);
    inputRef.current.focus();
  };

  return (
    <div className="w-full">
      <div
        className="bg-gray-50 flex flex-wrap items-center w-full rounded px-1 ring-1 ring-gray-400/70  gap-y-1 py-1 cursor-text"
        onClick={() => inputRef.current.focus()}
      >
        {rollNumbers.map((roll, index) => (
          <span key={index} className="text-xs px-1 font-[450]">
            <div className="flex gap-1 items-center bg-gray-100 px-0.5 rounded border border-gray-400">
              {roll}
              <X
                onClick={() => removeRollNumber(index)}
                className="cursor-pointer"
                size={13}
              />
            </div>
          </span>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          ref={inputRef}
          className="w-10 py-0.5 px-1 bg-gray-50 text-xs rounded font-[450]"
          style={{
            outline: "none", // Disable the default focus outline
          }}
        />
      </div>
    </div>
  );
};

export default RollNumberInput;
