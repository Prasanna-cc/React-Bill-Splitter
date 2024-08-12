import { useState, useEffect, useRef } from "react";
import { NumberInputInitializer } from "../numberInput/numberInputInitializer";

export interface BillSplitterDependencies {
  billDependencies: {
    BillInput: string;
    BillInputError: string;
    handleBillChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  nOPDependencies: {
    NumberOfPeopleInput: string;
    NumberOfPeopleInputError: string;
    handleNumberOfPeopleChange: (
      e: React.ChangeEvent<HTMLInputElement>
    ) => void;
  };
  tipMenuDependencies: {
    selectTipOnClick: (value: string) => void;
    isInput: boolean;
    inputElement: React.RefObject<HTMLInputElement>;
    showInputField: () => void;
    selectedTipValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleInputBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
  };
  totalsSectionDependencies: {
    tipPerPerson: string;
    totalAmountPerPerson: string;
    handleReset: () => void;
    isDisabled: boolean;
  };
}

export function dependenciesInitializer(): BillSplitterDependencies {
  let {
    inputValue: BillInput,
    setInputValue: setBillInput,
    errorValue: BillInputError,
    handleInputChange: handleBillChange,
  } = NumberInputInitializer({ typeOfIcon: "dollar" });
  let {
    inputValue: NumberOfPeopleInput,
    setInputValue: setNumberOfPeopleInput,
    errorValue: NumberOfPeopleInputError,
    handleInputChange: handleNumberOfPeopleChange,
  } = NumberInputInitializer({ typeOfIcon: "people" });

  const [selectedTipValue, setSelectedTipValue] = useState<string>("");

  const [isInput, setIsInput] = useState(false);
  const inputElement = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (isInput) inputElement.current?.focus();
  }, [isInput]);
  const showInputField = (): void => {
    setIsInput(true);
  };
  const selectTipOnClick = (value: string) => {
    if (!(selectedTipValue === value)) {
      setSelectedTipValue(value);
    } else {
      setSelectedTipValue("");
    }
    setIsInput(false);
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customTipValue = e.target.value;
    setSelectedTipValue(customTipValue);
  };
  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    const currentValue = e.target.value;
    e.target.autofocus = false;
    if (!currentValue) setIsInput(false);
  };

  const [tipPerPerson, setTipPerPerson] = useState<string>("0.00");

  const [totalAmountPerPerson, setTotalAmountPerPerson] =
    useState<string>("0.00");

  const [isDisabled, setIsDisabled] = useState(true);
  useEffect(() => {
    if (Number(BillInput) || Number(NumberOfPeopleInput) || selectedTipValue) {
      setIsDisabled(false);
      return;
    }
    setIsDisabled(true);
  }, [BillInput, NumberOfPeopleInput, selectedTipValue]);

  const handleReset = () => {
    setBillInput("");
    setNumberOfPeopleInput("");
    setSelectedTipValue("");
    setIsInput(false);
    setIsDisabled(true);
  };

  useEffect(() => {
    const BillInputNum = Number(BillInput);
    const NumberOfPeopleInputNum = Number(NumberOfPeopleInput);
    const tipPercentage = parseFloat(selectedTipValue) / 100;
    const totalTip = BillInputNum * tipPercentage;
    const tipPerPerson =
      NumberOfPeopleInputNum > 0 && totalTip > 0
        ? (totalTip / NumberOfPeopleInputNum).toFixed(2)
        : "0.00";
    setTipPerPerson(tipPerPerson);
    const totalAmountPerPerson =
      NumberOfPeopleInputNum > 0 && BillInputNum > 0
        ? parseFloat((BillInputNum / NumberOfPeopleInputNum).toFixed(2)) +
          Number(tipPerPerson)
        : "0.00";
    setTotalAmountPerPerson(String(totalAmountPerPerson));
  }, [BillInput, NumberOfPeopleInput, selectedTipValue]);

  return {
    billDependencies: { BillInput, BillInputError, handleBillChange },
    nOPDependencies: {
      NumberOfPeopleInput,
      NumberOfPeopleInputError,
      handleNumberOfPeopleChange,
    },
    tipMenuDependencies: {
      selectTipOnClick,
      isInput,
      inputElement,
      showInputField,
      selectedTipValue,
      handleInputChange,
      handleInputBlur,
    },
    totalsSectionDependencies: {
      tipPerPerson,
      totalAmountPerPerson,
      handleReset,
      isDisabled,
    },
  };
}
