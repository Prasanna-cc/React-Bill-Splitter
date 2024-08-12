import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BillSplitter } from "./components/BillSplitter/BillSplitter";
import { billSplitterApp } from "./components/BillSplitter/billSplitter.utils";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BillSplitter initializer={billSplitterApp}></BillSplitter>
  </React.StrictMode>
);
