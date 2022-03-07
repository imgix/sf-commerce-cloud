import React, { ReactElement } from "react";
import styles from "./Divider.module.scss";

interface Props {
  vertical?: boolean;
}

export function Divider({ vertical }: Props): ReactElement {
  const type = vertical ? styles.vertical : styles.horizontal;
  return <div className={`${type}`}></div>;
}
