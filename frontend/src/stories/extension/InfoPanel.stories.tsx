import { ComponentMeta, ComponentStory } from "@storybook/react";
import {
  InfoPanel,
  InfoPanelProps,
} from "../../components/InfoPanel/InfoPanel";
import { ImgixGETAssetsData } from "../../types";
import { MultiStory } from "../common/MultiStory";

export default {
  title: "Extension/Info Panel",
  component: InfoPanel,
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof InfoPanel>;

const selectedAssets = ["5e9f9f9f-f9f9-f9f9-f9f9-f9f9f9f9f9f9"];

const Template: ComponentStory<typeof InfoPanel> = (args) => (
  <MultiStory
    style={{
      display: "flex",
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    }}
    stories={[
      {
        label: "Default",
        story: <InfoPanel {...args} />,
      },
      {
        label: "Multiple Images",
        story: (
          <InfoPanel
            {...{
              ...args,
              selectedAssets: [
                ...selectedAssets,
                "6e9f9f9f-f9f9-f9f9-f9f9-f9f9f9f9f9f9",
              ],
            }}
          />
        ),
      },
    ]}
  ></MultiStory>
);

export const ProductImages = Template.bind({});
ProductImages.args = {
  selectedAssets: selectedAssets,
  assets: [
    {
      attributes: {
        description: "",
        name: "",
        origin_path: "/amsterdam.jpg",
        media_height: 1,
        media_width: 1,
      },
      id: "5e9f9f9f-f9f9-f9f9-f9f9-f9f9f9f9f9f9",
    },
    {
      attributes: {
        description: "",
        name: "",
        origin_path: "/amsterdam.jpg",
        media_height: 1,
        media_width: 1,
      },
      id: "6e9f9f9f-f9f9-f9f9-f9f9-f9f9f9f9f9f9",
    },
  ] as ImgixGETAssetsData,
  domain: "sdk-test.imgix.net",
  onSubmit: (assets: ImgixGETAssetsData) => {
    console.log("Submit", assets);
  },
} as InfoPanelProps;
