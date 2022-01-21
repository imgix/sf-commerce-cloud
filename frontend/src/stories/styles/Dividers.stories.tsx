import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Divider } from "../../components/dividers/Divider";
import { MultiStory } from "../common/MultiStory";

const Container = ({ children }: any) => {
  return <div style={{ width: 50 }}>{children}</div>;
};

export default {
  title: "Styles/Dividers",
  component: Divider,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof Divider>;

const Template: ComponentStory<typeof Divider> = (args) => (
  <MultiStory
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100%",
      maxWidth: 500,
      flexWrap: "wrap",
      justifyContent: "space-evenly",
      alignContent: "center",
    }}
    stories={[
      {
        label: "Divider",
        story: <Divider />,
      },
      {
        label: "Inside container",
        story: (
          <Container>
            <Divider />
          </Container>
        ),
      },
    ]}
  ></MultiStory>
);

export const Dividers = Template.bind({});
Dividers.args = {};
