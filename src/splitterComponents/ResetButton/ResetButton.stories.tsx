import type { Meta, StoryObj } from "@storybook/react";
import { ResetButton } from "./ResetButton";

const meta: Meta<typeof ResetButton> = {
  title: "App/ResetButton",
  component: ResetButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "RESET",
  },
};

export const Disabled: Story = {
  args: {
    value: "RESET",
    disabled: true,
  },
};
