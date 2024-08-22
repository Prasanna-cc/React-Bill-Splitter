import React, { useReducer } from "react";

/**
 * Represents the state of the BillSplitterApp.
 */
export interface State {
  /** The input value for the bill amount */
  BillInput: string;
  /** The input value for the number of people */
  NumberOfPeopleInput: string;
  /** The selected tip value */
  selectedTipValue: string;
  /** Whether the custom input field for the tip is visible */
  isInput: boolean;
}

/**
 * Represents the possible actions that can be dispatched in the reducer.
 */
type Action =
  | { type: "SET_BILL_INPUT"; payload: string }
  | { type: "SET_NUMBER_OF_PEOPLE_INPUT"; payload: string }
  | { type: "SET_SELECTED_TIP_VALUE"; payload: string }
  | { type: "SET_IS_INPUT"; payload: boolean };

/**
 * Represents the BillSplitterApp, which contains the state and handlers for the bill splitting logic.
 */
export interface BillSplitterApp {
  /** The current state of the application */
  state: State;
  /** Handler for changes to the bill input field */
  handleBillChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler for changes to the number of people input field */
  handleNumberOfPeopleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Array of predefined tip values */
  tipValues: string[];
  /** Handler for selecting a tip value */
  selectTipOnClick: (value: string) => void;
  /** Handler for showing the custom tip input field */
  showInputField: () => void;
  /** Handler for changes to the custom tip input field */
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Handler for when the custom tip input field loses focus */
  handleInputBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  /** Handler for resetting all input fields and state */
  handleReset: () => void;
}

/**
 * The initial states of the BillSplitterApp.
 */
const initialState: State = {
  BillInput: "",
  NumberOfPeopleInput: "",
  selectedTipValue: "",
  isInput: false,
};

/**
 * Reducer function to manage the state of the BillSplitterApp.
 * @param state - The current state of the application
 * @param action - The action to be performed on the state
 * @returns The new state after applying the action
 */
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

/**
 * Initializes and returns the BillSplitterApp, including the state and handlers.
 * @returns An object representing the BillSplitterApp
 */
export function billSplitterApp(): BillSplitterApp {
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

  const showInputField = (): void => {
    dispatch({ type: "SET_SELECTED_TIP_VALUE", payload: "" });
    dispatch({ type: "SET_IS_INPUT", payload: true });
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
    showInputField,
    handleInputChange,
    handleInputBlur,
    handleReset,
  };
}

/**
 * Calculates the tip per person based on the bill amount, number of people, and selected tip percentage.
 * @param billInputValue - The total bill amount
 * @param nOPInputValue - The number of people splitting the bill
 * @param selectedTipValue - The selected tip percentage
 * @returns The calculated tip per person as a string with two decimal places
 */
export const calculateTipPerPerson = (
  billInputValue: number,
  nOPInputValue: number,
  selectedTipValue: number = 0
): string => {
  const tipPercentage = selectedTipValue / 100;
  const totalTip = billInputValue * tipPercentage;
  const tipPerPerson =
    nOPInputValue > 0 && totalTip > 0
      ? (totalTip / nOPInputValue).toFixed(2)
      : "0.00";
  return tipPerPerson;
};

/**
 * Calculates the total amount per person, including the tip.
 * @param billInputValue - The total bill amount
 * @param nOPInputValue - The number of people splitting the bill
 * @param tipPerPerson - The tip amount per person
 * @returns The total amount per person as a string with two decimal places
 */
export const calculateTotalPerPerson = (
  billInputValue: number,
  nOPInputValue: number,
  tipPerPerson: number = 0
): string => {
  const totalAmountPerPerson =
    nOPInputValue > 0 && billInputValue > 0
      ? parseFloat((billInputValue / nOPInputValue).toFixed(2)) + tipPerPerson
      : "0.00";
  return String(totalAmountPerPerson);
};
