import React from "react";
import { FrameButton } from "../buttons/FrameButton/FrameButton";
import { AddSvg } from "../icons";
import styles from "./ActionBar.module.scss";

export type IActionBarProps = {
  disabled: boolean;
  onSave: () => void;
  onCancel: () => void;
};

export default function ActionBar({
  disabled,
  onSave,
  onCancel,
}: IActionBarProps) {
  return (
    <div className={styles.container}>
      <div className={styles.buttons}>
        <FrameButton label="Cancel" onClick={onCancel} />
        <FrameButton
          disabled={disabled}
          color="secondary"
          icon={<AddSvg />}
          label="Save Image"
          onClick={onSave}
        />
      </div>
    </div>
  );
}
