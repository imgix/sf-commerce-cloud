import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AssetBrowserContainer } from "../components/AssetBrowser/AssetBrowserContainer";
import { AssetBrowser } from "./AssetBrowser";

export default {
  title: "Example/AssetBrowser",
  component: AssetBrowser,
  argTypes: { onSelectAsset: { action: "selected" } },
} as ComponentMeta<typeof AssetBrowser>;

const Template: ComponentStory<typeof AssetBrowserContainer> = (args) => (
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "#fff",
      display: "flex",
      flexDirection: "column",
    }}
  >
    <AssetBrowserContainer {...args} />
  </div>
);

export const Default = Template.bind({});
Default.args = {
  apiKey: "",
};
