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
  domain: "sdk-test.imgix.net",
  assets: [
    {
      attributes: {
        origin_path: "/amsterdam.jpg",
      },
    } as any,
    {
      attributes: {
        origin_path: "/amsterdam.jpg",
      },
    } as any,
    {
      attributes: {
        origin_path: "/amsterdam.jpg",
      },
    } as any,
    {
      attributes: {
        origin_path: "/amsterdam.jpg",
      },
    } as any,
    {
      attributes: {
        origin_path: "/amsterdam.jpg",
      },
    } as any,
    {
      attributes: {
        origin_path: "/amsterdam.jpg",
      },
    } as any,
  ] as any,
};
