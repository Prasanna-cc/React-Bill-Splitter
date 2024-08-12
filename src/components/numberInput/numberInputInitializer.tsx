import React, { useState } from "react";
import { NumberInputProps } from "./NumberInput";

export function NumberInputInitializer({
  typeOfIcon,
  value: initialStateValue,
  error,
}: Pick<NumberInputProps, "value" | "error" | "typeOfIcon">) {
  // const initialStateValue = value ? value : undefined;
  const errorMsg = error ? error : "Enter number greater than 0";
  const [inputValue, setInputValue] = useState<string>(
    String(initialStateValue)
  );
  const initialNumber = initialStateValue ? Number(initialStateValue) : 0;
  const initialError = initialNumber >= 0 ? "" : errorMsg;
  const [errorValue, setErrorValue] = useState<string>(initialError);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = e.target.value;
    if (newValue.includes(".")) {
      if (typeOfIcon === "dollar") {
        newValue = newValue;
      } else newValue = newValue.replace(".", "");
    }
    if (newValue === "0" || Number(newValue) < 0) {
      setInputValue(newValue);
      setErrorValue(errorMsg);
    } else {
      setInputValue(newValue);
      setErrorValue("");
    }
  };

  return {
    inputValue,
    setInputValue,
    errorValue,
    setErrorValue,
    handleInputChange,
  };
}
