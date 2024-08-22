import type { Preview } from "@storybook/react";
import {
  INITIAL_VIEWPORTS,
  MINIMAL_VIEWPORTS,
} from "@storybook/addon-viewport";
import "../src/tailwind.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        ...INITIAL_VIEWPORTS,
        ...MINIMAL_VIEWPORTS,
      },
      defaultViewport: "iphone14promax",
    },
  },
  // decorators: [
  //   (Story) => {
  //     const { width, height } = useWindowSize();
  //     return (
  //       <div
  //         style={{
  //           padding: 0,
  //           display: "flex",
  //           flexDirection: "column",
  //           alignItems: "flex-start",
  //           fontFamily: "Space Mono",
  //         }}
  //       >
  //         <span
  //           style={{
  //             // position: "fixed",
  //             backgroundColor: "white",
  //             borderRadius: 20,
  //             padding: 2,
  //             lineHeight: 1.1,
  //             marginBottom: 50,
  //           }}
  //         >{`${width}:${height}`}</span>
  //         <Story />
  //       </div>
  //     );
  //   },
  // ],
};

export default preview;
