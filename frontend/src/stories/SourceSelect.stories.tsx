import { ComponentMeta, Story } from "@storybook/react";
import React, { ComponentProps } from "react";
import { ImgixGETSourcesData } from "../types";
import { SourceSelect } from "./SourceSelect";

export default {
  title: "Example/SourceSelect",
  component: SourceSelect,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof SourceSelect>;

const Template: Story<
  ComponentProps<typeof SourceSelect> & { width?: number }
> = ({ width = 228, ...args }) => (
  <div style={{ display: "flex", width }}>
    <SourceSelect {...args} />
  </div>
);

const dummySourcesData = [
  {
    id: "1",
    attributes: {
      name: "Source 1",
      deployment: {
        type: "s3",
      },
    },
    type: "sources",
  },
  {
    id: "2",
    attributes: {
      name: "Source 2",
      deployment: {
        type: "gcs",
      },
    },
    type: "sources",
  },
  {
    id: "3",
    attributes: {
      name: "Source 3",
      deployment: {
        type: "webfolder",
      },
    },
    type: "sources",
  },
  {
    id: "4",
    attributes: {
      name:
        "Source With A Super Long Name That Took Me About 30 Seconds To Write",
      deployment: {
        type: "webfolder",
      },
    },
    type: "sources",
  },
] as ImgixGETSourcesData;

export const Dropdown = Template.bind({});
Dropdown.args = {
  sources: dummySourcesData,
};

export const NoSource = Template.bind({});
NoSource.args = {
  sources: [],
};

export const Width228Px = Template.bind({});
Width228Px.args = {
  width: 288,
  sources: dummySourcesData,
};

export const Width150Px = Template.bind({});
Width150Px.args = {
  width: 150,
  sources: dummySourcesData,
};
