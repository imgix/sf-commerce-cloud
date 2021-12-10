import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Pagination as PaginationComponent } from "../components/Pagination/Pagination";
import { MultiStory } from "./common/MultiStory";

export default {
  title: "Example/Pagination",
  component: PaginationComponent,
  argTypes: { onPageChange: { action: "page changed" } },
} as ComponentMeta<typeof PaginationComponent>;

const Template: ComponentStory<typeof PaginationComponent> = (args) => (
  <MultiStory
    stories={[
      {
        label: "Normal",
        story: <PaginationComponent {...args} />,
        options: { style: { width: 223 } },
      },
      {
        label: "300px wide",
        story: <PaginationComponent {...args} />,
        options: { style: { width: 300 } },
      },
      {
        label: "First page",
        story: (
          <PaginationComponent
            {...args}
            cursor={{ ...args.cursor, current: "0" }}
          />
        ),
        options: { style: { width: 300 } },
      },
      {
        label: "Last page",
        story: (
          <PaginationComponent
            {...args}
            cursor={{ ...args.cursor, next: "" }}
          />
        ),
        options: { style: { width: 300 } },
      },
    ]}
    style={{ background: "#e3e7eb" }}
  ></MultiStory>
);

export const Pagination = Template.bind({});
Pagination.args = {
  cursor: {
    current: "1",
    next: "2",
    limit: 100,
    hasMore: true,
    totalRecords: 10,
  },
};
