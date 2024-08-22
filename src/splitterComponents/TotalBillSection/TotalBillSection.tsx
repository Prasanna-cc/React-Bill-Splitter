import React from "react";
import { ResetButton } from "../ResetButton/ResetButton";

/**
 * Props for the TotalBillSection component.
 */
interface TotalBillSectionProps {
  /** The tip amount per person to be displayed */
  tipPerPerson: string;
  /** The total amount per person to be displayed */
  totalPerPerson: string;
  /** Optional handler for the reset button click event */
  resetClickHandler?: React.MouseEventHandler<HTMLButtonElement>;
  /** Boolean to enable or disable the reset button */
  isResetDisabled: boolean;
}

/**
 * Props for the TipAndTotalInput component.
 */
interface TipAndTotalInputProps {
  /** Label to display for the input field ("Tip Amount" or "Total") */
  label: "Tip Amount" | "Total";
  /** Value to display in the input field */
  value: string;
}

/**
 * A section component displaying the tip amount and total amount per person,
 * along with a reset button.
 */
export function TotalBillSection({
  tipPerPerson,
  totalPerPerson,
  resetClickHandler,
  isResetDisabled = true,
}: TotalBillSectionProps) {
  /**
   * A component for displaying a label and value pair for tip or total amounts.
   */
  const TipAndTotalInput = ({ label, value }: TipAndTotalInputProps) => {
    return (
      <div className="flex w-full items-center justify-between font-space-mono">
        <div className="w-full flex flex-col text-container-bg tracking-[0.1em] font-normal leading-default text-label-xls ls:text-label-ls ts:text-label-ts">
          <div>{label}</div>
          <div className="text-dark-grey">/ person</div>
        </div>
        <div className="w-full max-w-full text-right text-total-amount-xls tracking-[0.03em] font-bold leading-default text-light-green overflow-x-auto scrollbar-hide ls:text-total-amount-ls ts:text-total-amount-ts">
          ${value}
        </div>
      </div>
    );
  };

  return (
    <div className="flex h-full w-full flex-col justify-between rounded-[16px] bg-dark-green p-[56px] ls:p-12 ts:p-8 ts:gap-[3.625rem]">
      <div className="flex w-full flex-col justify-between gap-[4rem] ts:gap-12 ms:gap-6">
        <TipAndTotalInput label="Tip Amount" value={tipPerPerson} />
        <TipAndTotalInput label="Total" value={totalPerPerson} />
      </div>
      <div className="flex w-full flex-col justify-end">
        <ResetButton
          value="RESET"
          disabled={isResetDisabled}
          onClick={resetClickHandler}
        />
      </div>
    </div>
  );
}
