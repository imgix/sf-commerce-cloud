import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  IPaginationData,
  Pagination as PaginationComponent,
} from "../components/Pagination/Pagination";
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
            data={{
              ...args.data,
              current: 0,
              hasPrev: false,
            }}
          />
        ),
      },
      {
        label: "Last page",
        story: (
          <PaginationComponent
            {...args}
            data={{ ...args.data, hasNext: false }}
          />
        ),
      },
      {
        label: "Disabled",
        story: (
          <PaginationComponent
            {...args}
            data={{ ...args.data, hasNext: false }}
            disabled
          />
        ),
      },
    ]}
    style={{ background: "#EEF0F2" }}
  ></MultiStory>
);

export const Pagination = Template.bind({});
Pagination.args = {
  data: {
    current: 0,
    hasNext: true,
    hasPrev: true,
    totalNumPages: 10,
  } as IPaginationData,
};
