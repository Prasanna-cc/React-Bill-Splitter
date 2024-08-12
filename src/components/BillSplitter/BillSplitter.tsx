import React from "react";
import "../../index.css";
import styles from "./BillSplitter.module.css";
import { TotalBillSection } from "../TotalBillSection/TotalBillSection";
import { TipSelection } from "../TipSelection/TipSelection";
import { NumberInput } from "../numberInput/NumberInput";
// import { BillSplitterDependencies } from "./statesInitializer";
import {
  BillSplitterApp,
  calculateTipPerPerson,
  calculateTotalPerPerson,
} from "./billSplitter.utils";

interface BillSplitterProps {
  initializer: () => BillSplitterApp;
}

export function BillSplitter({ initializer }: BillSplitterProps) {
  const store = initializer();
  const tip = calculateTipPerPerson(
    Number(store.state.BillInput),
    Number(store.state.NumberOfPeopleInput),
    Number(store.state.selectedTipValue || 0)
  );
  const total = calculateTotalPerPerson(
    Number(store.state.BillInput),
    Number(store.state.NumberOfPeopleInput),
    Number(tip || 0)
  );
  // data-observe-resizes
  return (
    <div className={styles.appContainer}>
      <div>
        <p>SPLI</p>
        <p>TTER</p>
      </div>
      <div className={styles.container}>
        <div className={styles.billingFormContainer}>
          <NumberInput
            label="Bill"
            typeOfIcon="dollar"
            value={store.state.BillInput}
            error={
              store.state.BillInput !== "0" &&
              Number(store.state.BillInput) >= 0
                ? ""
                : "Enter number greater than 0"
            }
            onChange={store.handleBillChange}
          ></NumberInput>
          <div className={styles.spacer_one}></div>
          <TipSelection
            tipValues={store.tipValues}
            selectTipOnClick={store.selectTipOnClick}
            selectedTipValue={store.state.selectedTipValue}
            isInput={store.state.isInput}
            inputElement={store.inputElement}
            showInputField={store.showInputField}
            handleInputChange={store.handleInputChange}
            handleInputBlur={store.handleInputBlur}
          ></TipSelection>
          <div className={styles.spacer_two}></div>
          <NumberInput
            label="Number Of People"
            typeOfIcon="people"
            value={store.state.NumberOfPeopleInput}
            error={
              store.state.NumberOfPeopleInput !== "0" &&
              Number(store.state.NumberOfPeopleInput) >= 0
                ? ""
                : "Enter number greater than 0"
            }
            onChange={store.handleNumberOfPeopleChange}
          ></NumberInput>
          {/* <div className={styles.spacer_three}></div> */}
        </div>
        <div className={styles.totalsContainer}>
          <TotalBillSection
            tipPerPerson={tip}
            totalPerPerson={total}
            resetClickHandler={store.handleReset}
            isResetDisabled={
              !(
                store.state.selectedTipValue ||
                store.state.BillInput ||
                store.state.NumberOfPeopleInput
              )
            }
          ></TotalBillSection>
        </div>
      </div>
    </div>
  );
}
