import React from "react";
import "../../index.css";
import styles from "./TotalBillSection.module.css";
import { ResetButton } from "../resetButton/ResetButton";

interface TotalBillSectionProps {
  tipPerPerson: string;
  totalPerPerson: string;
  // tip?: string;
  // total?: string;
  resetClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  isResetDisabled: boolean;
}

interface TipAndTotalInputProps {
  label: "Tip Amount" | "Total";
  value: string;
}

export function TotalBillSection({
  tipPerPerson,
  totalPerPerson,
  resetClickHandler,
  isResetDisabled = true,
}: TotalBillSectionProps) {
  const TipAndTotalInput = ({ label, value }: TipAndTotalInputProps) => {
    return (
      <div className={styles.amountContainer}>
        <div className={styles.labelBox}>
          <div className={styles.mainLabel}>{label}</div>
          <div className={styles.subLabel}>/ person</div>
        </div>
        <div className={styles.amountNumber}>${value}</div>
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.total}>
        <TipAndTotalInput
          label="Tip Amount"
          value={tipPerPerson}
        ></TipAndTotalInput>
        <TipAndTotalInput
          label="Total"
          value={String(totalPerPerson)}
        ></TipAndTotalInput>
      </div>
      <div className={styles.btnContainer}>
        <ResetButton
          value="RESET"
          disabled={isResetDisabled}
          onClick={resetClickHandler}
        ></ResetButton>
      </div>
    </div>
  );
}
