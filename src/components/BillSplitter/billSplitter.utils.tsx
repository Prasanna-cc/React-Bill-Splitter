import React, { useReducer, useEffect, useRef } from "react";

export interface State {
  BillInput: string;
  NumberOfPeopleInput: string;
  selectedTipValue: string;
  isInput: boolean;
}

type Action =
  | { type: "SET_BILL_INPUT"; payload: string }
  | { type: "SET_NUMBER_OF_PEOPLE_INPUT"; payload: string }
  | { type: "SET_SELECTED_TIP_VALUE"; payload: string }
  | { type: "SET_IS_INPUT"; payload: boolean };

export interface BillSplitterApp {
  state: State;
  handleBillChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleNumberOfPeopleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  tipValues: string[];
  selectTipOnClick: (value: string) => void;
  showInputField: () => void;
  inputElement: React.RefObject<HTMLInputElement>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  handleReset: () => void;
}

const initialState: State = {
  BillInput: "",
  NumberOfPeopleInput: "",
  selectedTipValue: "",
  isInput: false,
};

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_BILL_INPUT":
      return { ...state, BillInput: action.payload };
    case "SET_NUMBER_OF_PEOPLE_INPUT":
      return { ...state, NumberOfPeopleInput: action.payload };
    case "SET_SELECTED_TIP_VALUE":
      return { ...state, selectedTipValue: action.payload };
    case "SET_IS_INPUT":
      return { ...state, isInput: action.payload };
    default:
      return state;
  }
}

export function billSplitterApp() {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleBillChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue: string = e.target.value;
    dispatch({ type: "SET_BILL_INPUT", payload: newValue });
  };

  const handleNumberOfPeopleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let newValue: string = e.target.value;
    if (newValue.includes(".")) {
      newValue = newValue.replace(".", "");
    }
    dispatch({ type: "SET_NUMBER_OF_PEOPLE_INPUT", payload: newValue });
  };

  const inputElement = useRef<HTMLInputElement>(null);

  const showInputField = (): void => {
    dispatch({ type: "SET_SELECTED_TIP_VALUE", payload: "" });
    dispatch({ type: "SET_IS_INPUT", payload: true });
    if (state.isInput) inputElement.current?.focus();
  };

  const selectTipOnClick = (value: string) => {
    dispatch({
      type: "SET_SELECTED_TIP_VALUE",
      payload: state.selectedTipValue === value ? "" : value,
    });
    dispatch({ type: "SET_IS_INPUT", payload: false });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let customTipValue = e.target.value;
    if (customTipValue.includes("-")) {
      customTipValue = customTipValue.replace("-", "");
    }
    dispatch({ type: "SET_SELECTED_TIP_VALUE", payload: customTipValue });
  };

  const tipValues = ["5", "10", "15", "25", "50", "Custom"];

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const currentValue = e.target.value;
    e.target.autofocus = false;

    if (!currentValue || tipValues.includes(state.selectedTipValue)) {
      dispatch({ type: "SET_IS_INPUT", payload: false });
    }
  };

  const handleReset = () => {
    dispatch({ type: "SET_BILL_INPUT", payload: "" });
    dispatch({ type: "SET_NUMBER_OF_PEOPLE_INPUT", payload: "" });
    dispatch({ type: "SET_SELECTED_TIP_VALUE", payload: "" });
    dispatch({ type: "SET_IS_INPUT", payload: false });
  };

  return {
    state,
    handleBillChange,
    handleNumberOfPeopleChange,
    tipValues,
    selectTipOnClick,
    inputElement,
    showInputField,
    handleInputChange,
    handleInputBlur,
    handleReset,
  };
}

export const calculateTipPerPerson = (
  billInputValue: number,
  nOPInputValue: number,
  selectedTipValue: number = 0
) => {
  const tipPercentage = selectedTipValue / 100;
  const totalTip = billInputValue * tipPercentage;
  const tipPerPerson =
    nOPInputValue > 0 && totalTip > 0
      ? (totalTip / nOPInputValue).toFixed(2)
      : "0.00";
  return tipPerPerson;
};

export const calculateTotalPerPerson = (
  billInputValue: number,
  nOPInputValue: number,
  tipPerPerson: number = 0
) => {
  const totalAmountPerPerson =
    nOPInputValue > 0 && billInputValue > 0
      ? parseFloat((billInputValue / nOPInputValue).toFixed(2)) + tipPerPerson
      : "0.00";
  return String(totalAmountPerPerson);
};
