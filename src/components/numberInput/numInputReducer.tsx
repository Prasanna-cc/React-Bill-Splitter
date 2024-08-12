import React, { useReducer } from "react";
import { NumberInputProps } from "./NumberInput";

interface State {
  inputValue: string;
  errorValue: string;
}

type Action =
  | { type: "SET_INPUT_VALUE"; payload: string }
  | { type: "SET_ERROR_VALUE"; payload: string };

const initialState = (
  initialStateValue: number | undefined,
  error: string | undefined
): State => ({
  inputValue: String(initialStateValue),
  errorValue:
    initialStateValue && initialStateValue >= 0
      ? ""
      : error || "Enter number greater than 0",
});

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_INPUT_VALUE":
      return { ...state, inputValue: action.payload };
    case "SET_ERROR_VALUE":
      return { ...state, errorValue: action.payload };
    default:
      return state;
  }
}

export function NumberInputInitializer({
  typeOfIcon,
  value: initialStateValue,
  error,
}: Pick<NumberInputProps, "value" | "error" | "typeOfIcon">) {
  const [state, dispatch] = useReducer(
    reducer,
    initialState(Number(initialStateValue), error)
  );

  const errorMsg = error || "Enter number greater than 0";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = e.target.value;
    if (newValue.includes(".")) {
      if (typeOfIcon !== "dollar") {
        newValue = newValue.replace(".", "");
      }
    }
    if (newValue === "0" || Number(newValue) < 0) {
      dispatch({ type: "SET_INPUT_VALUE", payload: newValue });
      dispatch({ type: "SET_ERROR_VALUE", payload: errorMsg });
    } else {
      dispatch({ type: "SET_INPUT_VALUE", payload: newValue });
      dispatch({ type: "SET_ERROR_VALUE", payload: "" });
    }
  };

  return {
    inputValue: state.inputValue,
    errorValue: state.errorValue,
    handleInputChange,
  };
}
