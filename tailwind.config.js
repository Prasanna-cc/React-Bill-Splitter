/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "space-mono": ['"Space Mono"', "monospace"],
      },
      fontSize: {
        app: "1.5rem",
        "form-number-xls": "2rem",
        "form-number-ls": "1.5rem",
        "form-number-ts": "1.4rem",
        "error-msg-xls": "0.875rem",
        "error-msg-ls": "0.7rem",
        "error-msg-ts": "0.65rem",
        "label-xls": "1.25rem",
        "label-ls": "1rem",
        "label-ts": "0.8rem",
        "button-text-xls": "1.5rem",
        "button-text-ls": "1.25rem",
        "button-text-ts": "1rem",
        "total-amount-xls": "3rem",
        "total-amount-ls": "2.5rem",
        "total-amount-ts": "1.8375rem",
      },
      colors: {
        "app-bg": "#c5e4e7",
        "container-bg": "#ffffff",
        "input-field-bg": "#f3f8fb",
        error: "#b57b6d",
        label: "#5d6b6c",
        "button-hover": "#9fe8df",
        "custom-tip-hover": "#dce4ec",
        "button-disabled": "#0d686d",
        "light-green": "#2cc0ad",
        "dark-green": "#00474b",
        "dark-grey": "#9fb3b2",
      },
      boxShadow: {
        "input-field-smooth": "0 8px 15px -3px #bdcccc",
      },
      transitionProperty: {
        "ease-out": "0.2s ease-out",
      },
      fontWeight: {
        bold: 700,
        normal: 400,
      },
      lineHeight: {
        default: "1.5",
      },
      screens: {
        xls: { max: "1200px" },
        ls: { max: "1100px" },
        ts: { max: "884px" },
        ms: { max: "700px" },
      },
    },
  },
  corePlugins: {
    appearance: false,
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        'input[type="number"]::-webkit-outer-spin-button, input[type="number"]::-webkit-inner-spin-button':
          {
            appearance: "none",
            margin: 0,
          },
        'input[type="number"]': {
          appearance: "textfield",
        },
      });
    },
  ],
};
