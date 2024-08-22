import { TotalBillSection } from "../TotalBillSection/TotalBillSection";
import { TipSelection } from "../TipSelection/TipSelection";
import { NumberInput } from "../NumberInput/NumberInput";
import {
  BillSplitterApp,
  calculateTipPerPerson,
  calculateTotalPerPerson,
} from "./billSplitter.utils";

/**
 * Props for the BillSplitter component.
 */
interface BillSplitterProps {
  /** A function that initializes and returns the BillSplitterApp store */
  initializer: () => BillSplitterApp;
}

/**
 * A component that renders the BillSplitter app,
 * including input fields for the bill and the number of people,
 * tip selection, and the calculated tip and total per person.
 */
export function BillSplitter({ initializer }: BillSplitterProps) {
  const store = initializer();

  // Calculate the tip per person based on the bill, number of people, and selected tip value
  const tip = calculateTipPerPerson(
    Number(store.state.BillInput),
    Number(store.state.NumberOfPeopleInput),
    Number(store.state.selectedTipValue || 0)
  );

  // Calculate the total amount per person, including the tip
  const total = calculateTotalPerPerson(
    Number(store.state.BillInput),
    Number(store.state.NumberOfPeopleInput),
    Number(tip || 0)
  );

  return (
    <div className="flex w-full min-h-full flex-col items-center justify-start gap-[5rem] bg-app-bg px-8 py-40 font-space-mono text-app leading-default font-bold tracking-[0.8rem] text-dark-green ls:gap-[3rem] ts:gap-[2rem] ms:min-w-[20rem] ms:gap-[2.0625rem] ms:px-0 ms:pt-10 ms:pb-0">
      <div className="text-center">
        <p>SPLI</p>
        <p>TTER</p>
      </div>
      <div className="grid w-full max-w-[1280px] grid-cols-[minmax(28.35rem,0.9fr)_minmax(0,1fr)] gap-[3.75rem] rounded-[32px] bg-container-bg p-[3.75rem] ls:grid-cols-[minmax(0,0.9fr)_minmax(0,1fr)] ls:gap-[3rem] ls:p-[3rem] ts:grid-cols-[minmax(14rem,0.9fr)_minmax(0,1fr)] ts:gap-[2rem] ts:p-[2rem] ms:max-w-[550px] ms:grid-cols-1 ms:gap-[0.5rem] ms:rounded-b-[0]">
        <div className="w-full flex flex-col">
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
          />
          <div className="w-full h-[1.75rem] ls:h-[1rem] ts:h-[0.5rem]" />
          <TipSelection
            tipValues={store.tipValues}
            selectTipOnClick={store.selectTipOnClick}
            selectedTipValue={store.state.selectedTipValue}
            isInput={store.state.isInput}
            showInputField={store.showInputField}
            handleInputChange={store.handleInputChange}
            handleInputBlur={store.handleInputBlur}
          />
          <div className="h-[3.5rem] ls:h-[2.75rem] ts:h-[2rem]" />
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
          />
        </div>
        <div className="flex w-full">
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
          />
        </div>
      </div>
    </div>
  );
}
