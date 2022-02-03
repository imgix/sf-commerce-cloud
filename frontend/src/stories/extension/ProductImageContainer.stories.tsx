import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { IImgixCustomAttributeImage } from "../../../../types";
import {
  ProductPageImages,
  ProductPageImagesProps,
} from "../../components/ProductPageImages";
import { MultiStory } from "../common/MultiStory";

export default {
  title: "Extension/Product Image Container",
  component: ProductPageImages,
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof ProductPageImages>;

const selectedImage = [
  {
    src: "https://sdk-test.imgix.net/amsterdam.jpg",
    imgix_metadata: {
      attributes: {
        description: "amsterdam",
        name: "/amsterdam.jpg",
        origin_path: "/amsterdam.jpg",
        media_height: 0,
        media_width: 0,
      },
      base_url: "sdk-test.imgix.net",
      id: "1",
      type: "assets",
    },
  },
] as IImgixCustomAttributeImage[];
const selectedImages: any = [];

for (let i = 0; i < 15; i++) {
  selectedImages.push({
    src: "https://sdk-test.imgix.net/amsterdam.jpg",
    view_type: {
      large: true,
      medium: true,
      small: true,
    },
    imgix_metadata: {
      attributes: {
        description: "amsterdam",
        name: "/amsterdam.jpg",
        origin_path: "/amsterdam.jpg",
        media_height: 0,
        media_width: 0,
      },
      base_url: "sdk-test.imgix.net",
      id: i + 5,
      type: "assets",
    },
  });
}

const Template: ComponentStory<typeof ProductPageImages> = (args) => (
  <MultiStory
    stories={[
      {
        label: "Default",
        story: <ProductPageImages {...args} />,
      },
      {
        label: "With selected image",
        story: <ProductPageImages {...args} images={selectedImage} />,
      },
      {
        label: "With many selected images",
        story: <ProductPageImages {...args} images={selectedImages} />,
      },
    ]}
    style={{
      background: "#EEF0F2",
    }}
  ></MultiStory>
);

export const ProductImages = Template.bind({});
ProductImages.args = {} as ProductPageImagesProps;
