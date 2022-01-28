import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SourceSelectButton as _SourceSelectButton } from "../components/buttons/SourceSelectButton";

export default {
  title: "Example/SourceSelect/Source Select Button",
  component: _SourceSelectButton,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof _SourceSelectButton>;

const Template: ComponentStory<typeof _SourceSelectButton> = (args) => (
  <_SourceSelectButton {...args} />
);

export const SourceSelectButton = Template.bind({});
SourceSelectButton.args = {
  label: "Button",
};
