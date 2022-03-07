import React, { ReactElement } from "react";
import { AddSvg } from "../icons/AddSvg";
import styles from "./AddButton.module.scss";
interface Props {
  onOpenBreakoutClick: () => void;
  disabled?: boolean;
  height?: number;
  label?: string;
  width?: number;
}

export const AddButton = ({
  onOpenBreakoutClick,
  disabled,
  height,
  label,
  width,
}: Props): ReactElement => {
  return (
    <div
      className={styles.addButtonWrapper}
      onClick={onOpenBreakoutClick}
      style={{ height, width }}
    >
      <div
        className={`${styles.addImageButton} ${
          disabled ? styles.addImageButtonDisabled : ""
        }`}
      >
        <div className={styles.addIcon}>
          <AddSvg />
        </div>
        {label}
      </div>
    </div>
  );
};
