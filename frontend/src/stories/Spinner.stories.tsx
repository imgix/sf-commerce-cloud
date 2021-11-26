import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Spinner as SpinnerComponent } from "../components/Spinner/Spinner";

export default {
  title: "Example/Spinner",
  component: SpinnerComponent,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof SpinnerComponent>;

const Template: ComponentStory<typeof SpinnerComponent> = (args) => (
  <SpinnerComponent {...args} />
);

export const Spinner = Template.bind({});
Spinner.args = {};

export const WithLabel = Template.bind({});
WithLabel.args = {
  label: "Loading memes...",
};
