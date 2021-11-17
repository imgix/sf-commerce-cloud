import React, { ReactElement } from "react";
import { App as _SidebarApp, ISidebarAppProps } from "../components/SidebarApp";
import styles from "./SidebarApp.module.css";

export function SidebarApp({ ...otherProps }: ISidebarAppProps): ReactElement {
  return (
    <div className={styles.storyWrapper}>
      <_SidebarApp {...otherProps} />
    </div>
  );
}
