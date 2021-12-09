import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AssetBrowserContainer } from "../components/AssetBrowser/AssetBrowserContainer";
import { AssetBrowser } from "./AssetBrowser";

export default {
  title: "Example/AssetBrowser",
  component: AssetBrowser,
  argTypes: { onSelectAsset: { action: "selected" } },
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof AssetBrowser>;

const Template: ComponentStory<typeof AssetBrowser> = (args) => (
  <AssetBrowser {...args} />
);

export const Default = Template.bind({});
Default.args = {
  apiKey: "",
};

const SmallTemplate: ComponentStory<typeof AssetBrowserContainer> = (args) => (
  <div
    style={{
      position: "absolute",
      top: 32,
      right: 32,
      bottom: 32,
      left: 32,
      background: "#fff",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <AssetBrowserContainer {...args} />
  </div>
);

export const SmallContainer = SmallTemplate.bind({});
SmallContainer.args = {
  apiKey: "",
};
