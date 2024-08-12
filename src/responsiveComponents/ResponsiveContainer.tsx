import { BillSplitter } from "../components/BillSplitter/BillSplitter";
import { billSplitterApp } from "../components/BillSplitter/billSplitter.utils";
import { ro } from "./resizeObserver";

class ResponsiveContainer extends HTMLElement {
  // component = (<BillSplitter initializer={billSplitterApp}></BillSplitter>);
  connectedCallback() {
    ro.observe(this);
  }
}

// function ResponsiveContainerFn() {
//   ro.observe(<BillSplitter initializer={billSplitterApp}></BillSplitter>);
// }

self.customElements.define("responsive-container", ResponsiveContainer);
