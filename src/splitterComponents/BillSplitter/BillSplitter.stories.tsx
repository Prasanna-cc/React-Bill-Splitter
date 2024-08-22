import type { Meta, StoryObj } from "@storybook/react";
import { BillSplitter } from "./BillSplitter";
import { billSplitterApp } from "./billSplitter.utils";

const meta: Meta<typeof BillSplitter> = {
  title: "App/BillSplitter",
  component: BillSplitter,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    initializer: billSplitterApp,
  },
};
