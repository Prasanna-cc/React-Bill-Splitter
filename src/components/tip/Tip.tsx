import React from "react";
import "../../index.css";
import styles from "./Tip.module.css";

interface TipButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  value: number | "Custom";
  selectedTipValue?: string;
  isInput?: boolean;
}

export function TipButton({
  value,
  selectedTipValue,
  isInput,
  children,
  ...delegated
}: TipButtonProps) {
  let btnText: string = `${value.toString()}%`;
  let btnClass = styles.tipButton;
  if (value === "Custom") {
    btnText = value;
    btnClass = styles.customTipButton;
  }
  if (isInput) {
    btnClass += " " + styles.hide;
    return children;
  }
  btnClass +=
    selectedTipValue === String(value) ? " " + styles.selectedTip : "";
  return (
    <button className={btnClass} {...delegated}>
      {btnText}
    </button>
  );
}

interface TipInputProps extends React.ComponentProps<"input"> {
  isInput: boolean;
}

export function TipInput({ isInput, ...delegated }: TipInputProps) {
  return (
    <input
      type="number"
      className={isInput ? styles.customTipInput : styles.hide}
      {...delegated}
    ></input>
  );
}
