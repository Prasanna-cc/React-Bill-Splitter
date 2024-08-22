import type { Meta, StoryObj } from "@storybook/react";
import { TipSelection } from "./TipSelection";

const meta: Meta<typeof TipSelection> = {
  title: "App/TipSelection",
  component: TipSelection,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
