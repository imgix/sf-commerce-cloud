import React, { ReactElement } from "react";
import { RefreshSvg } from "../icons/RefreshSvg";
import styles from "./ReplaceButton.module.scss";
interface Props {
  label?: string;
  onCLick?: () => void;
}

export const ReplaceButton = ({
  onCLick = () => null,
  label,
}: Props): ReactElement => {
  return (
    <>
      <div className={styles.replaceImageOverlayButton} onClick={onCLick}>
        <div
          className={styles.replaceImageIcon}
          style={label?.length ? {} : { marginRight: 0 }}
        >
          <RefreshSvg />
        </div>
        {label}
      </div>
    </>
  );
};
