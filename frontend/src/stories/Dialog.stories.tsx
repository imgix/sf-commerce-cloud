import { ComponentMeta, ComponentStory } from "@storybook/react";
import React from "react";
import { ArrowRight, DisabledSvg } from "../components/icons";
import { Dialog as _Dialog } from "../components/layouts/Dialog";

export default {
  title: "Styles/Dialog",
  component: _Dialog,
  parameters: {
    layout: "centered",
  },
} as ComponentMeta<typeof _Dialog>;

const Template: ComponentStory<typeof _Dialog> = (args) => {
  const onClose = () => {
    console.log("[imgix] Dialog closed");
  };
  const onCancel = () => {
    console.log("[imgix] Dialog cancelled");
  };
  const onAccept = () => {
    console.log("[imgix] Dialog accepted");
  };

  return (
    <>
      <_Dialog {...{ ...args, onClose, onAccept, onCancel }}>
        <div>
          <p>
            This is a react component as a child of the Dialog component. You
            can use it to display any content you want.
          </p>
        </div>
      </_Dialog>
    </>
  );
};

export const Dialog = Template.bind({});
Dialog.args = {
  text: "Dialog title",
  acceptLabel: "Accept",
  acceptIcon: <ArrowRight />,
  cancelLabel: "Cancel",
  cancelIcon: <DisabledSvg />,
};
