import React, { ReactChild, ReactElement } from "react";
import styles from "./Overlay.module.scss";

interface Props {
  children: ReactChild | ReactChild[];
  visible: boolean;
  rounded?: boolean;
}

export const Overlay = ({
  children,
  visible,
  rounded,
}: Props): ReactElement => {
  return visible ? (
    <div className={`${styles.Overlay} ${rounded ? styles.rounded : ""}`}>
      {children}
    </div>
  ) : (
    <></>
  );
};
