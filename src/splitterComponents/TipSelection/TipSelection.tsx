import React from "react";
import { TipButton, TipInput } from "../Tip/Tip";

/**
 * Props for the TipSelection component.
 */
export interface TipOptionsProps {
  /** Array of tip values to display as buttons, including a "Custom" option */
  tipValues: string[];
  /** Callback function to handle tip selection */
  selectTipOnClick?: (value: string) => void;
  /** Boolean to determine if the custom tip input field should be shown */
  isInput: boolean;
  /** Function to show the custom input field */
  showInputField: () => void;
  /** Currently selected tip value */
  selectedTipValue?: string;
  /** Function to handle changes to the custom tip input field */
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Function to handle when the custom tip input field loses focus */
  handleInputBlur: (e: React.FocusEvent<HTMLInputElement, Element>) => void;
}

/**
 * A component that displays a set of tip percentage options as buttons, including a custom tip button.
 * The component handles selecting a tip value and displaying an input field for custom tip values.
 */
export function TipSelection({
  tipValues,
  selectTipOnClick,
  isInput,
  showInputField,
  selectedTipValue,
  handleInputChange,
  handleInputBlur,
}: TipOptionsProps) {
  return (
    <div className="flex w-full flex-col gap-6 font-space-mono ls:gap-4 ts:gap-3">
      <span className="text-label-xls font-bold leading-default text-label tracking-[0.1em] ls:text-label-ls ts:text-label-ts">
        Select Tip %
      </span>
      <div className="grid w-full grid-cols-3 gap-6 ls:grid-cols-[repeat(auto-fit,minmax(6rem,1fr))] ls:gap-4 ts:grid-cols-[repeat(auto-fit,minmax(5rem,1fr))] ts:gap-2 ms:grid-cols-[repeat(auto-fit,minmax(7.5rem,1fr))] ms:gap-4 ms:mx-auto">
        {tipValues.map((tipValue) =>
          tipValue === "Custom" ? (
            <TipButton
              key={tipValue}
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
                autoFocus
              />
            </TipButton>
          ) : (
            <TipButton
              key={tipValue}
              value={Number(tipValue)}
              selectedTipValue={selectedTipValue}
              onClick={() => selectTipOnClick && selectTipOnClick(tipValue)}
            />
          )
        )}
      </div>
    </div>
  );
}
