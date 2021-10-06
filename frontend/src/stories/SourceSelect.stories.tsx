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
      name: "Source 1",
      domain: "https://source1.com",
    },
    {
      id: "2",
      name: "Source 2",
      domain: "https://source2.com",
    },
    {
      id: "3",
      name: "Source with a stupidly long name just as an example",
      domain: "https://source3.com",
    },
  ],
};
