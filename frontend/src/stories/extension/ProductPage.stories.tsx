import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  ProductPageImages,
  ProductPageImagesProps,
} from "../../components/ProductPageImages";
import { IImgixCustomAttributeValue } from "../../types/imgixSF";
import { MultiStory } from "../common/MultiStory";

export default {
  title: "Extension/Product Image Container",
  component: ProductPageImages,
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof ProductPageImages>;

const selectedImage = [
  {
    src: "https://sdk-test.imgix.net/amsterdam.jpg",
  },
] as IImgixCustomAttributeValue[];
const selectedImages: any = [];

for (let i = 0; i < 50; i++) {
  selectedImages.push({
    src: "https://sdk-test.imgix.net/amsterdam.jpg",
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
        story: <ProductPageImages {...{ ...args, images: selectedImage }} />,
      },
      {
        label: "With many selected images",
        story: <ProductPageImages {...{ ...args, images: selectedImages }} />,
      },
    ]}
    style={{
      background: "#EEF0F2",
    }}
  ></MultiStory>
);

export const ProductImages = Template.bind({});
ProductImages.args = {
  images: selectedImage,
} as ProductPageImagesProps;
