import React, { ReactElement } from "react";
import { App as _SidebarApp } from "../components/SidebarApp";
import styles from "./SidebarApp.module.css";

interface Props {}

export function SidebarApp({ ...otherProps }: Props): ReactElement {
  return (
    <div className={styles.storyWrapper}>
      <_SidebarApp {...otherProps} />
    </div>
  );
}
