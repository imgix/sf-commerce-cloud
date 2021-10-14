import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AssetBrowser } from "./AssetBrowser";

export default {
  title: "Example/AssetBrowser",
  component: AssetBrowser,
} as ComponentMeta<typeof AssetBrowser>;

const Template: ComponentStory<typeof AssetBrowser> = (args) => (
  <AssetBrowser {...args} />
);

export const NoApiKey = Template.bind({});
NoApiKey.args = {
  apiKey: "",
};
