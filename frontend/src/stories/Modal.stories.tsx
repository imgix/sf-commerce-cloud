import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { Modal as _Modal } from "../components/layouts/Modal";

export default {
  title: "Style/Modal",
  component: _Modal,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof _Modal>;

const Template: ComponentStory<typeof _Modal> = (args) => {
  const [open, setOpen] = React.useState(false);
  const onClose = () => {
    console.log("[imgix] Modal closed");
    setOpen(false);
  };
  const onOpen = (data: any) => {
    console.log("[imgix] Modal opened");
    setOpen(true);
  };

  return (
    <>
      <_Modal {...{ ...args, open, onClose }}>
        <div>
          <h1>I'm in a modal!</h1>
          <h2>Hit escape or click outside to close.</h2>
          <h2>Set `locked` to `true` to disable click-outside.</h2>
        </div>
      </_Modal>
      <button onClick={onOpen}>Open modal</button>
    </>
  );
};

export const Modal = Template.bind({});
Modal.args = {};
