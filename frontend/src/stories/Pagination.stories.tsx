import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Pagination as PaginationComponent } from "../components/Pagination/Pagination";

export default {
  title: "Example/Pagination",
  component: PaginationComponent,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof PaginationComponent>;

const Template: ComponentStory<typeof PaginationComponent> = (args) => (
  <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
    <PaginationComponent {...args} />
  </div>
);

export const Pagination = Template.bind({});
Pagination.args = {};
