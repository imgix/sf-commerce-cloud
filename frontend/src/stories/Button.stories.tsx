import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { Button } from "../components/buttons/Button";
import { SourceMenuSvg } from "../components/icons/SourceMenuSvg";

export default {
  title: "Example/Buttons",
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const BasicButton = Template.bind({});
BasicButton.args = {
  label: "Button",
};

export const DownButton = Template.bind({});
DownButton.args = {
  label: "Button",
  type: "dropdown",
};

export const LibraryButton = Template.bind({});
LibraryButton.args = {
  label: "Button",
  type: "dropdown",
  Icon: <SourceMenuSvg />,
};
