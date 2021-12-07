import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ImgixGETAssetsData } from "../types/imgixAPITypes";
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
  assets: Array.from({ length: 10 + Math.floor(Math.random() * 50) }).map(
    (v) =>
      ({
        attributes: {
          origin_path: "/amsterdam.jpg",
        },
      } as ImgixGETAssetsData[0])
  ),
};

export const Loading = Template.bind({});
Loading.args = {
  loading: true,
  assets: [],
};
