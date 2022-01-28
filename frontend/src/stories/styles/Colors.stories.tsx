import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import styles from "../../styles/Colors.module.scss";
import { MultiStory } from "../common/MultiStory";

// Helpers to convert color names to hex values
function decToHex(value: number) {
  if (value > 255) {
    return "FF";
  } else if (value < 0) {
    return "00";
  } else {
    return value.toString(16).padStart(2, "0").toUpperCase();
  }
}
function rgbToHex(r: number, g: number, b: number) {
  return "#" + decToHex(r) + decToHex(g) + decToHex(b);
}

function rgbStringToHexString(rgbString: string) {
  const rgb = rgbString.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!rgb) {
    return rgbString;
  }
  const r = parseInt(rgb[1]);
  const g = parseInt(rgb[2]);
  const b = parseInt(rgb[3]);
  return rgbToHex(r, g, b);
}

const ColorDiv = ({
  color,
  children,
}: {
  color: string;
  children: React.ReactNode;
}) => {
  // get computer style color from the element on first render and store it to state
  const [renderedColor, setColor] = React.useState("");
  React.useEffect(() => {
    const element = document.getElementsByClassName(color);
    const elementStyle = window.getComputedStyle(element[0]);
    const elementColor = elementStyle.getPropertyValue("background-color");

    if (element) {
      setColor(rgbStringToHexString(elementColor));
    }
  }, [color]);
  return (
    <div className={color}>
      <p style={{ justifyContent: "center", backgroundColor: "white" }}>
        {renderedColor}
      </p>
      {children}
    </div>
  );
};

export default {
  title: "Styles/Colors",
  component: ColorDiv,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof ColorDiv>;

// create a storiesArray from every color in styles/Colors.module.scss
let colorKeys = Object.keys(styles).filter((key) => key.includes("color"));

const stories = colorKeys.map((key) => {
  const label = key.replace("color", "").replace(/_/g, " ").toUpperCase();
  const container = (
    <div id={key} style={{ width: 100, height: 100, margin: 25 }}></div>
  );

  return {
    label,
    story: <ColorDiv color={styles[key]}>{container}</ColorDiv>,
  };
});

const Template: ComponentStory<typeof ColorDiv> = () => (
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

export const Colors = Template.bind({});
