import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AssetGrid } from "./AssetGrid";

export default {
  title: "Example/AssetGrid",
  component: AssetGrid,
} as ComponentMeta<typeof AssetGrid>;

const Template: ComponentStory<typeof AssetGrid> = (args) => (
  <AssetGrid {...args} />
);

export const BasicGrid = Template.bind({});
BasicGrid.args = {
  assets: [
    {
      filename: "amsterdam.jpg",
      url:
        "https://sdk-test.imgix.net/amsterdam.jpg?fit=crop&w=169.828&h=136&dpr=2&q=50&auto=format%2Ccompress",
    },
    {
      filename: "amsterdam.jpg",
      url:
        "https://sdk-test.imgix.net/amsterdam.jpg?fit=crop&w=169.828&h=136&dpr=2&q=50&auto=format%2Ccompress",
    },
    {
      filename: "amsterdam.jpg",
      url:
        "https://sdk-test.imgix.net/amsterdam.jpg?fit=crop&w=169.828&h=136&dpr=2&q=50&auto=format%2Ccompress",
    },
    {
      filename: "amsterdam.jpg",
      url:
        "https://sdk-test.imgix.net/amsterdam.jpg?fit=crop&w=169.828&h=136&dpr=2&q=50&auto=format%2Ccompress",
    },
    {
      filename: "amsterdam.jpg",
      url:
        "https://sdk-test.imgix.net/amsterdam.jpg?fit=crop&w=169.828&h=136&dpr=2&q=50&auto=format%2Ccompress",
    },
    {
      filename: "amsterdam.jpg",
      url:
        "https://sdk-test.imgix.net/amsterdam.jpg?fit=crop&w=169.828&h=136&dpr=2&q=50&auto=format%2Ccompress",
    },
  ] as any,
};
