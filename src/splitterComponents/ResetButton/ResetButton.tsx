import React from "react";
// import styles from "./ResetButton.module.css";

/**
 * Props for the ResetButton component.
 */
export interface ResetButtonProps
  extends React.ComponentPropsWithoutRef<"button"> {
  /** The text to display on the button */
  value: string;
}

/**
 * A button component designed to be used in the Bill Splitter app.
 * It includes styles for different states like hover, focus, and disabled.
 */
export function ResetButton({ value, ...delegated }: ResetButtonProps) {
  return (
    <button
      className={`w-full rounded-[7px] border-none bg-light-green py-[13px] font-space-mono font-bold text-button-text-xls leading-default tracking-[0.1em] text-dark-green cursor-pointer
        hover:bg-button-hover 
        focus:outline-none focus:ring-2 focus:ring-container-bg
        disabled:bg-button-disabled disabled:cursor-not-allowed
        ls:text-button-text-ls
        ts:text-button-text-ts
        ms:py-[9px]`}
      {...delegated}
    >
      {value}
    </button>
  );
}
