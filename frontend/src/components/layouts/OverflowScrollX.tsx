import React, { ReactElement } from "react";
import styles from "./OverflowScrollX.module.scss";

interface Props {
  children: ReactElement | ReactElement[];
}

export const OverflowScrollX = ({ children }: Props): ReactElement => {
  return (
    <div className={styles.overflowXContainer}>
      <div className={styles.overflowListContainer}>{children}</div>
    </div>
  );
};
