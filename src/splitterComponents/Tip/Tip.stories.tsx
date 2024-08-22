import type { Meta, StoryObj } from "@storybook/react";
import { TipButton } from "./Tip";

const meta: Meta<typeof TipButton> = {
  title: "App/Tip",
  component: TipButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Five: Story = {
  args: {
    value: 5,
  },
};

export const Ten: Story = {
  args: {
    value: 10,
  },
};
export const Fifteen: Story = {
  args: {
    value: 15,
  },
};

export const Twentyfive: Story = {
  args: {
    value: 25,
  },
};

export const Fifty: Story = {
  args: {
    value: 50,
  },
};

export const Custom: Story = {
  args: {
    value: "Custom",
  },
};
