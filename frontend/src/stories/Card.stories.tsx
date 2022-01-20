import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AssetCard } from "../components/card/AssetCard";
import { MultiStory } from "./common/MultiStory";

export default {
  title: "Example/Image Card",
  component: AssetCard,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof AssetCard>;

const Template: ComponentStory<typeof AssetCard> = (args) => (
  <MultiStory
    stories={[
      {
        label: "Normal",
        story: <AssetCard {...args} />,
      },
      {
        label: "with unsupported file formal",
        story: (
          <AssetCard
            {...{
              ...args,
              asset: {
                ...args.asset,
                attributes: {
                  ...args.asset.attributes,
                  origin_path: "/amsterdam.mp4",
                },
              },
            }}
          />
        ),
        options: { style: { width: 300 } },
      },
      {
        label: "with invalid path",
        story: (
          <AssetCard
            {...{
              ...args,
              asset: {
                ...args.asset,
                attributes: {
                  ...args.asset.attributes,
                  origin_path: "/_amsterdam.jpg",
                },
              },
            }}
          />
        ),
        options: { style: { width: 300 } },
      },
    ]}
  />
);

export const Simple = Template.bind({});
Simple.args = {
  asset: {
    id: "1",
    type: "assets",
    attributes: {
      origin_path: "/amsterdam.jpg",
      description: "",
      name: "",
      media_width: 0,
      media_height: 0,
    },
  },
  domain: "sdk-test.imgix.net",
  selectedAssetId: "1",
  onClick: () => {},
};
