import React, { ReactElement } from "react";
import { AddSvg } from "../icons/AddSvg";
import styles from "../SidebarApp.module.css";
interface Props {
  width?: number;
  height?: number;
  label?: string;
  disabled?: boolean;
  onOpenBreakoutClick: () => void;
}

export const AddIButton = ({
  width,
  height = 60,
  label,
  disabled,
  onOpenBreakoutClick,
}: Props): ReactElement => {
  return (
    <div
      onClick={onOpenBreakoutClick}
      className={styles.imageWrapper}
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
