import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AssetCard as _AssetCard } from "../components/card/AssetCard";
import { MultiStory } from "./common/MultiStory";

export default {
  title: "Example/Asset Card",
  component: _AssetCard,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof _AssetCard>;

const Template: ComponentStory<typeof _AssetCard> = (args) => (
  <MultiStory
    stories={[
      {
        label: "Normal",
        story: <_AssetCard {...args} />,
      },
      {
        label: "with unsupported file formal",
        story: (
          <_AssetCard
            {...args}
            asset={{
              id: "1",
              type: "assets",
              attributes: {
                origin_path: "/amsterdam.mov",
                description: "",
                name: "",
                media_width: 0,
                media_height: 0,
              },
            }}
          />
        ),
        options: { style: { width: 300 } },
      },
      {
        label: "with invalid path",
        story: (
          <_AssetCard
            {...args}
            asset={{
              id: "2",
              type: "assets",
              attributes: {
                origin_path: "/_amsterdam.jpg",
                description: "",
                name: "",
                media_width: 0,
                media_height: 0,
              },
            }}
          />
        ),
        options: { style: { width: 300 } },
      },
    ]}
  />
);

export const AssetCard = Template.bind({});
AssetCard.args = {
  asset: {
    id: "0",
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
  selectedAssetId: "",
  onClick: () => {},
};
