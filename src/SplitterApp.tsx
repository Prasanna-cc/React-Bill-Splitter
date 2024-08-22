import { BillSplitter } from "./splitterComponents/BillSplitter/BillSplitter";
import { billSplitterApp } from "./splitterComponents/BillSplitter/billSplitter.utils";
import "./SplitterApp.css";

export const SplitterApp = () => {
  return <BillSplitter initializer={billSplitterApp}></BillSplitter>;
};
