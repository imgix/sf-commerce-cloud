import React, { ReactElement } from "react";
import { RefreshSvg } from "../icons/RefreshSvg";
import styles from "../SidebarApp.module.css";
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
          style={label?.length ? {} : { marginRight: 0 }}
          className={styles.replaceImageIcon}
        >
          <RefreshSvg />
        </div>
        {label}
      </div>
    </>
  );
};
