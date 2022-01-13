import React, { ReactChild, ReactElement } from "react";
import styles from "../SidebarApp.module.css";

interface Props {
  children: ReactChild | ReactChild[];
}

export const Overlay = ({ children }: Props): ReactElement => {
  return <div className={styles.replaceImageOverlay}>{children}</div>;
};
