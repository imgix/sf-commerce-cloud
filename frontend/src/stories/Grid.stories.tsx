import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ImageCard } from "../components/card/ImageCard";
import { Grid } from "../components/layouts/ImageGrid";
import { MultiStory } from "./common/MultiStory";

export default {
  title: "Example/Grid",
  component: Grid,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Grid>;

const Template: ComponentStory<typeof ImageCard> = (args) => (
  <MultiStory
    stories={[
      {
        label: "Normal",
        story: (
          <Grid>
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
          </Grid>
        ),
      },
      {
        label: "With images",
        story: (
          <Grid>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => (
              <ImageCard
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
          </Grid>
        ),
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
