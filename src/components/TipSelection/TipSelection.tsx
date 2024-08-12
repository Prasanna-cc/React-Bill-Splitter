import React from "react";
import "../../index.css";
import styles from "./TipSelection.module.css";
import { TipButton, TipInput } from "../tip/Tip";

interface TipOptionsProps {
  tipValues: string[];
  selectTipOnClick?: (value: string) => void;
  isInput: boolean;
  inputElement: React.RefObject<HTMLInputElement>;
  showInputField: () => void;
  selectedTipValue?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleInputBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

export function TipSelection({
  tipValues,
  selectTipOnClick,
  isInput,
  inputElement,
  showInputField,
  selectedTipValue,
  handleInputChange,
  handleInputBlur,
}: TipOptionsProps) {
  if (selectTipOnClick) {
    return (
      <div className={styles.container}>
        <span className={styles.tipHeading}>Select Tip %</span>
        <div className={styles.tipGrid}>
          {tipValues.map((tipValue) => {
            return tipValue === "Custom" ? (
              <TipButton
                value={tipValue}
                selectedTipValue={selectedTipValue}
                onClick={showInputField}
                isInput={isInput}
              >
                <TipInput
                  isInput={isInput}
                  value={selectedTipValue}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  ref={inputElement}
                  autoFocus
                ></TipInput>
              </TipButton>
            ) : (
              <TipButton
                value={Number(tipValue)}
                selectedTipValue={selectedTipValue}
                onClick={() => selectTipOnClick(tipValue)}
              ></TipButton>
            );
          })}
        </div>
      </div>
    );
  }
  return (
    <div className={styles.container}>
      <span className={styles.tipHeading}>Select Tip %</span>
      <div className={styles.tipGrid}>
        <TipButton value={5}></TipButton>
        <TipButton value={10}></TipButton>
        <TipButton value={15}></TipButton>
        <TipButton value={25}></TipButton>
        <TipButton value={50}></TipButton>
        <TipButton value={"Custom"}></TipButton>
      </div>
    </div>
  );
}
