import { ro } from "./resizeObserver";

class ResponsiveContainer extends HTMLElement {
  connectedCallback() {
    ro.observe(this);
  }
}

self.customElements.define("responsive-container", ResponsiveContainer);
