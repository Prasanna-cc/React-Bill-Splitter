import React, { useState } from "react";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { NumberInput, NumberInputProps } from "./NumberInput";

const meta: Meta<typeof NumberInput> = {
  title: "App/NumberInput",
  component: NumberInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type ErrorObject = {
  cond: boolean;
  msg: string;
};
interface TemplateProps extends NumberInputProps {
  errorOb: ErrorObject;
}

export const NumInputTemplate: StoryFn<TemplateProps> = ({
  label,
  typeOfIcon,
  value: initialStateValue,
  error,
}: TemplateProps) => {
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
    const newNumber = Number(newValue);
    if (newNumber && newNumber <= 0) {
      setInputValue(newValue);
      setErrorValue(errorMsg);
    } else {
      setInputValue(newValue);
      setErrorValue("");
    }
  };

  const returnComp = inputValue ? (
    <NumberInput
      label={label}
      typeOfIcon={typeOfIcon}
      value={inputValue}
      error={errorValue}
      onChange={handleInputChange}
    ></NumberInput>
  ) : (
    <NumberInput
      label={label}
      typeOfIcon={typeOfIcon}
      error={errorValue}
      onChange={handleInputChange}
    ></NumberInput>
  );

  return returnComp;
};

const template: StoryObj<TemplateProps> = {
  render: NumInputTemplate,
};

export const Default: StoryObj<TemplateProps> = {
  ...template,
  args: {
    label: "Bill",
    typeOfIcon: "dollar",
  },
};

export const BillTen: StoryFn<TemplateProps> = NumInputTemplate.bind({});
BillTen.args = {
  value: 10,
  label: "Bill",
  typeOfIcon: "dollar",
};

export const DefaultNoOfPeople: StoryObj<TemplateProps> = {
  ...template,
  args: { label: "Number of people", typeOfIcon: "people" },
};

export const NoOfPeopleFive: StoryObj<TemplateProps> = {
  ...template,
  args: {
    value: 5,
    label: "Number of people",
    typeOfIcon: "people",
  },
};

export const NoOfPeopleError: StoryObj<TemplateProps> = {
  ...template,
  args: {
    value: -1,
    label: "Number of people",
    typeOfIcon: "people",
    error: "Can't be negative",
  },
};
