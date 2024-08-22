import React from "react";
import clsx from "clsx";
// import styles from "./Tip.module.css";

/**
 * Props for the TipButton component.
 */
export interface TipButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  /** The value of the tip button, either a number or the string "Custom" */
  value: number | "Custom";
  /** The currently selected tip value */
  selectedTipValue?: string;
  /** Flag to determine if the button should render as an input */
  isInput?: boolean;
}

/**
 * A button component used for selecting tip values in the Bill Splitter app.
 * Displays different styles based on whether the button is selected, a custom tip, or a standard tip.
 */
export function TipButton({
  value,
  selectedTipValue,
  isInput,
  children,
  ...delegated
}: TipButtonProps) {
  const isSelected = selectedTipValue === String(value);
  const isCustom = value === "Custom";

  const baseClass =
    "flex w-full items-center justify-center rounded-[6px] p-2 border-none font-space-mono font-bold tracking-[0.088em] leading-default text-center transition-colors ease-out cursor-pointer";

  const buttonClass = clsx(baseClass, {
    "bg-input-field-bg text-label text-button-text-xls hover:bg-custom-tip-hover ls:text-button-text-ls ts:text-button-text-ts":
      isCustom,
    "bg-light-green text-form-number-xls text-dark-green hover:bg-light-green ls:text-form-number-ls ts:text-form-number-ts":
      isSelected,
    "bg-dark-green text-container-bg text-form-number-xls hover:bg-button-hover hover:text-dark-green ls:text-form-number-ls ts:text-form-number-ts":
      !isCustom && !isSelected,
  });

  if (isInput) {
    return children;
  }

  return (
    <button className={buttonClass} {...delegated}>
      {isCustom ? value : `${value}%`}
    </button>
  );
}

/**
 * Props for the TipInput component.
 */
export interface TipInputProps extends React.ComponentProps<"input"> {
  /** Flag to determine if the component should render as an input */
  isInput: boolean;
}

/**
 * An input component used for entering a custom tip value in the Bill Splitter app.
 * Renders an input field if the isInput prop is true.
 */
export function TipInput({ isInput, ...delegated }: TipInputProps) {
  if (!isInput) return null;

  return (
    <input
      type="number"
      className="w-[calc(100%-3px)] h-[calc(100%-3px)] rounded-[6px] border-none bg-input-field-bg text-form-number-xls text-dark-green font-space-mono font-bold text-center tracking-[0.1em] leading-default outline-[3px] outline-transparent focus:outline-light-green py-1 px-2 appearance-none ls:text-form-number-ls ts:text-form-number-ts"
      {...delegated}
    />
  );
}
