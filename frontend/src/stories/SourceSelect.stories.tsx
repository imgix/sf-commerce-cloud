import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SourceSelect } from "./SourceSelect";

export default {
  title: "Example/SourceSelect",
  component: SourceSelect,
} as ComponentMeta<typeof SourceSelect>;

const Template: ComponentStory<typeof SourceSelect> = (args) => (
  <SourceSelect {...args} />
);

export const Dropdown = Template.bind({});
Dropdown.args = {
  sources: [
    {
      id: "1",
      attributes: { name: "Source 1" },
      type: "image",
    },
    {
      id: "2",
      attributes: { name: "Source 2" },
      type: "image",
    },
    {
      id: "3",
      attributes: { name: "Source 3" },
      type: "image",
    },
  ],
};

export const NoSource = Template.bind({});
NoSource.args = {
  sources: [],
};
