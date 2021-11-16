import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { SidebarApp } from "./SidebarApp";

export default {
  title: "Example/SidebarApp",
  component: SidebarApp,
  argTypes: { onSelectAsset: { action: "selected" } },
} as ComponentMeta<typeof SidebarApp>;

const Template: ComponentStory<typeof SidebarApp> = (args) => (
  <SidebarApp {...args} />
);

export const Default = Template.bind({});
Default.args = {
  apiKey: "",
};

export const EmptyState = Template.bind({});
Default.args = {
  value: undefined
};