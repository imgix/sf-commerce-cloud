import React from "react";
import styles from "./DownArrowSvg.module.scss";

export const DownArrowSvg = () => {
  return (
    <svg className={styles.svg} viewBox="0 0 10 7">
      <path d="M5 6.4L.3 1.7 1.7.3 5 3.6 8.3.3l1.4 1.4z"></path>
    </svg>
  );
};
