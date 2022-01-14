import React, { ReactChild, ReactElement } from "react";
import styles from "./Overlay.module.scss";

interface Props {
  children: ReactChild | ReactChild[];
  visible: boolean;
}

export const Overlay = ({ children, visible }: Props): ReactElement => {
  return visible ? <div className={styles.Overlay}>{children}</div> : <></>;
};
