import React, { ReactElement } from "react";
import { RefreshSvg } from "../icons/RefreshSvg";
import styles from "./ReplaceButton.module.scss";
interface Props {
  label?: string;
  onClick?: () => void;
}

export const ReplaceButton = ({ onClick, label }: Props): ReactElement => {
  return (
    <div className={styles.replaceImageOverlayButton} onClick={onClick}>
      <div
        className={styles.replaceImageIcon}
        // if no label is provided, we use remove the margin to center the icon
        style={label?.length ? {} : { marginRight: 0 }}
      >
        <RefreshSvg />
      </div>
      {label}
    </div>
  );
};
