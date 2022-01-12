import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import {
  ProductPageImages,
  ProductPageImagesProps,
} from "../components/ProductPageImages";
import { MultiStory } from "./common/MultiStory";

export default {
  title: "Example/ProductPage",
  component: ProductPageImages,
  argTypes: { onClick: { action: "clicked" } },
} as ComponentMeta<typeof ProductPageImages>;

const selectedImage = [
  {
    title: "Image 1",
    url: "https://sdk-test.imgix.net/amsterdam.jpg",
  },
];
const selectedImages: any = [];

for (let i = 0; i < 50; i++) {
  selectedImages.push({
    title: "Image 1",
    url: "https://sdk-test.imgix.net/amsterdam.jpg",
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
      background: "#e3e7eb",
    }}
  ></MultiStory>
);

export const ProductPageImageContainer = Template.bind({});
ProductPageImageContainer.args = {
  images: null,
} as ProductPageImagesProps;
