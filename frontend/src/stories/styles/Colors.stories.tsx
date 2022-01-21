import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import styles from "../../styles/Colors.module.scss";
import { MultiStory } from "../common/MultiStory";

const ColorDiv = ({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) => {
  return <div className={color}>{children}</div>;
};

export default {
  title: "Styles/Colors",
  component: ColorDiv,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof ColorDiv>;

// create a storiesArray from every color in styles/Colors.module.scss
const colorKeys = Object.keys(styles).filter((key) => key.includes("color"));

const stories = colorKeys.map((key) => ({
  label: key.replace("color", "").replace(/_/g, " ").toUpperCase(),
  story: (
    <ColorDiv color={styles[key]}>
      {<div style={{ width: 100, height: 100, margin: 25 }}></div>}
    </ColorDiv>
  ),
}));

const Template: ComponentStory<typeof ColorDiv> = (args) => (
  <MultiStory
    style={{
      display: "flex",
      flexDirection: "row",
      maxWidth: 900,
      flexWrap: "wrap",
      justifyContent: "space-evenly",
    }}
    stories={stories}
  ></MultiStory>
);

export const Palette = Template.bind({});
Palette.args = {};
