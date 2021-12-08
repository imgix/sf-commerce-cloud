import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../components/buttons/Button";
import { SourceMenuSvg } from "../components/icons/SourceMenuSvg";
import { DownArrowSvg } from "../components/icons/DownArrowSvg";

export default {
  title: "Example/Buttons",
  component: Button,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const BasicButton = Template.bind({});
BasicButton.args = {
  label: "Button",
};

export const DownButton = Template.bind({});
DownButton.args = {
  label: "Button",
  rightIcon: <DownArrowSvg />,
};

export const LibraryButton = Template.bind({});
LibraryButton.args = {
  label: "Button",
  rightIcon: <DownArrowSvg />,
  leftIcon: <SourceMenuSvg />,
};
