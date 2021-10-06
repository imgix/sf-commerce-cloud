import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { SearchBar } from "./SearchBar";

export default {
  title: "Example/SearchBar",
  component: SearchBar,
} as ComponentMeta<typeof SearchBar>;

const Template: ComponentStory<typeof SearchBar> = (args) => (
  <SearchBar {...args} />
);

export const BasicSearch = Template.bind({});
BasicSearch.args = {
  placeholder: "Search by filename or path",
};
