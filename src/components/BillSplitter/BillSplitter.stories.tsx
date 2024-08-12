import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { BillSplitter } from "./BillSplitter";
// import { dependenciesInitializer } from "./statesInitializer";
import { billSplitterApp } from "./billSplitter.utils";

const meta: Meta<typeof BillSplitter> = {
  title: "App/BillSplitter",
  component: BillSplitter,
  // parameters: {
  //   // layout: "filled",
  // },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initializer: billSplitterApp,
  },
};
