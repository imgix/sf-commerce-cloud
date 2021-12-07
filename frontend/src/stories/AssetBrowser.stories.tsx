import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AssetBrowser } from "./AssetBrowser";

export default {
  title: "Example/AssetBrowser",
  component: AssetBrowser,
  argTypes: { onSelectAsset: { action: "selected" } },
} as ComponentMeta<typeof AssetBrowser>;

const Template: ComponentStory<typeof AssetBrowser> = (args) => (
  <AssetBrowser {...args} />
);

export const Default = Template.bind({});
Default.args = {
  apiKey: "",
};
