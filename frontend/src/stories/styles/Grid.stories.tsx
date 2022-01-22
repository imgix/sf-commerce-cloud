import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { AssetCard } from "../../components/card/AssetCard";
import { Grid as _Grid } from "../../components/layouts/ImageGrid";
import { MultiStory } from "../common/MultiStory";

export default {
  title: "Styles/Grid",
  component: _Grid,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof _Grid>;

const Template: ComponentStory<typeof AssetCard> = (args) => (
  <MultiStory
    stories={[
      {
        label: "Normal",
        story: (
          <_Grid>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
              <div
                key={i}
                className="grid-item"
                style={{
                  backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                  width: 225,
                  height: 225,
                }}
              >
                {i}
              </div>
            ))}
          </_Grid>
        ),
      },
      {
        label: "With AssetCards",
        story: (
          <_Grid>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
              <AssetCard
                {...{
                  ...args,
                  asset: {
                    ...args.asset,
                    attributes: {
                      ...args.asset.attributes,
                      origin_path: `/amsterdam.jpg?txt=${i}&txt-size=24&txt-color=ffff&txt-align=middle,center&txt-font=Futura%20Condensed%20Medium`,
                    },
                  },
                }}
              />
            ))}
          </_Grid>
        ),
      },
    ]}
  />
);

export const Grid = Template.bind({});
Grid.args = {
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
