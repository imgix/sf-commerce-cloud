import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { App as SidebarApp } from "../components/SidebarApp";

export default {
  title: "Example/SidebarApp",
  component: SidebarApp,
  decorators: [
    (Story: any) => (
      <div
        style={{
          width: 368,
          boxShadow: "-1px 0 3px 0 rgb(0 0 0 / 25%)",
          padding: 12,
          margin: "12px auto",
        }}
      >
        <Story />
      </div>
    ),
  ],
} as ComponentMeta<typeof SidebarApp>;

const Template: ComponentStory<typeof SidebarApp> = (args) => (
  <SidebarApp {...args} />
);

export const EmptyState = Template.bind({});
EmptyState.args = {
  value: undefined,
};

export const WithImage = Template.bind({});
WithImage.args = {
  value: {
    src: "https://assets.imgix.net/amsterdam.jpg",
    mediaWidth: 2000,
    mediaHeight: 1000,
  },
};
