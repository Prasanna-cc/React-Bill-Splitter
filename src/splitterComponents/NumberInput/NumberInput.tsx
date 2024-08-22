import React, { useId } from "react";
// import styles from "./NumberInput.module.css";
import dolla from "../../assets/billSplitterSvgs/dolla.svg";
import person from "../../assets/billSplitterSvgs/personIcon.svg";

/**
 * Props for the NumberInput component.
 */
export interface NumberInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  /** The label to display above the input field */
  label: string;
  /** Type of icon to display within the input field, either a person or dollar icon */
  typeOfIcon: "people" | "dollar";
  /** Error message to display below the input field */
  error: string;
}

/**
 * A component that renders an input field with an associated label,
 * icon (dollar or person), and an error message if present.
 */
export function NumberInput({
  value,
  label,
  typeOfIcon,
  error,
  ...delegated
}: NumberInputProps) {
  const uniqueId = useId();
  const inputId = uniqueId + "number-input";

  const icon = typeOfIcon === "dollar" ? dolla : person;

  const inputContStyle = error
    ? "outline outline-[3px] outline-error"
    : "hover:shadow-input-field-smooth focus-within:outline focus-within:outline-[3px] focus-within:outline-light-green";

  return (
    <div className="flex w-full flex-col gap-3 overflow-visible font-space-mono leading-default">
      <label
        htmlFor={inputId}
        className={`w-max font-bold tracking-widest text-label-xls leading-default text-label 
                    ls:text-label-ls 
                    ts:text-label-ts`}
      >
        {label}
      </label>
      <div
        className={`flex w-full flex-row rounded-[6px] bg-input-field-bg transition-[box-shadow] ease-out ${
          inputContStyle
        }`}
      >
        <div className="flex flex-shrink-0 justify-center px-5 py-2 ts:px-4 ts:py-2.5">
          <img src={icon}></img>
        </div>
        <input
          type="number"
          id={inputId}
          value={value}
          className="w-full flex-2 border-none rounded-[6px] bg-input-field-bg tracking-widest text-right text-form-number-xls font-bold text-dark-green outline-none py-2 pr-5 ls:text-form-number-ls ts:text-form-number-ts placeholder:text-dark-grey ts:pr-4"
          placeholder="0"
          {...delegated}
        />
      </div>
      <div
        className={`min-h-[1rem] tracking-widest text-right text-error-msg-xls font-bold leading-[1.14] text-error 
                    ls:text-error-msg-ls 
                    ts:text-error-msg-ts`}
      >
        {error}
      </div>
    </div>
  );
}
