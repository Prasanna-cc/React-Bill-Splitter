import React, { EffectCallback, useEffect, useId } from "react";
import "../../index.css";
import styles from "./NumberInput.module.css";
import dolla from "../../assets/billSplitterSvgs/dolla.svg";
import person from "../../assets/billSplitterSvgs/personIcon.svg";
import { State } from "../BillSplitter/billSplitter.utils";

export interface NumberInputProps
  extends React.ComponentPropsWithoutRef<"input"> {
  // value?: string;
  // state: State;
  label: string;
  typeOfIcon: "people" | "dollar";
  error?: string;
}

export function NumberInput({
  value,
  label,
  typeOfIcon,
  error,
  ...delegated
}: NumberInputProps) {
  const uniqueId = useId();
  const inputId = uniqueId + "number-input";

  let icon;
  if (typeOfIcon === "dollar") icon = dolla;
  else icon = person;

  const inputContStyle = error
    ? styles.inputContainer + " " + styles.errorOutline
    : styles.inputContainer;

  return (
    <div className={styles.container}>
      <label htmlFor={inputId} className={styles.label}>
        {label}
      </label>
      <div className={inputContStyle}>
        <div className={styles.iconContainer}>
          <img src={icon}></img>
        </div>
        <input
          type="number"
          id={inputId}
          value={value}
          className={styles.numberInput}
          placeholder="0"
          {...delegated}
        />
      </div>
      <div className={styles.errorMsg}>{error}</div>
    </div>
  );
}
