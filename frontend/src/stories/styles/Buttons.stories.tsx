import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { FrameButton } from "../../components/buttons/FrameButton/FrameButton";
import { AddSvg } from "../../components/icons/AddSvg";
import { MultiStory } from "../common/MultiStory";

const _FrameButton = (args: any) => {
  return (
    <div style={{ margin: 12 }}>
      <FrameButton {...args} />
    </div>
  );
};

export default {
  title: "Styles/Buttons",
  component: FrameButton,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof FrameButton>;

const Template: ComponentStory<typeof FrameButton> = (args) => (
  <MultiStory
    style={{
      display: "flex",
      flexDirection: "row",
      minHeight: "100%",
      maxWidth: 500,
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignContent: "center",
    }}
    stories={[
      {
        label: "Primary",
        story: <_FrameButton {...args} />,
      },
      {
        label: "Secondary",
        story: <_FrameButton {...args} type="secondary" />,
      },
      {
        label: "Tertiary",
        story: <_FrameButton {...args} type="tertiary" />,
      },
      {
        label: "Primary - no icon",
        story: <_FrameButton {...args} />,
      },
      {
        label: "Secondary - no icon",
        story: <_FrameButton {...args} type="secondary" />,
      },
      {
        label: "Tertiary - no icon",
        story: <_FrameButton {...args} type="tertiary" />,
      },
      {
        label: "Primary - icon only",
        story: <_FrameButton {...args} />,
      },
      {
        label: "Secondary - icon only",
        story: <_FrameButton {...args} type="secondary" />,
      },
      {
        label: "Tertiary - icon only",
        story: <_FrameButton {...args} type="tertiary" />,
      },
    ]}
  ></MultiStory>
);

export const Buttons = Template.bind({});
Buttons.args = {
  label: "Button",
  type: "primary",
  icon: <AddSvg />,
};
