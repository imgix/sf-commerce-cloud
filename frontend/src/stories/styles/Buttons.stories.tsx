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
        story: <_FrameButton {...args} color="secondary" />,
      },
      {
        label: "Tertiary",
        story: <_FrameButton {...args} color="tertiary" />,
      },
      {
        label: "Primary - no icon",
        story: <_FrameButton {...args} icon={null} />,
      },
      {
        label: "Secondary - no icon",
        story: <_FrameButton {...args} color="secondary" icon={null} />,
      },
      {
        label: "Tertiary - no icon",
        story: <_FrameButton {...args} color="tertiary" icon={null} />,
      },
      {
        label: "Primary - icon only",
        story: <_FrameButton {...args} text={null} />,
      },
      {
        label: "Secondary - icon only",
        story: <_FrameButton {...args} color="secondary" text={null} />,
      },
      {
        label: "Tertiary - icon only",
        story: <_FrameButton {...args} color="tertiary" text={null} />,
      },
    ]}
  ></MultiStory>
);

export const Buttons = Template.bind({});
Buttons.args = {
  text: "Button",
  color: "primary",
  icon: <AddSvg />,
};
