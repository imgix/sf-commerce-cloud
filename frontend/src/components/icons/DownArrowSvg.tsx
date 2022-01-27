import React from "react";
import styles from "./Icon.module.scss";

export const DownArrowSvg = ({ className }: { className?: string }) => (
  <div className={`${styles.container} ${className}`}>
    <svg viewBox="0 0 10 7" style={{ width: 10 }}>
      <path d="M5 6.4L.3 1.7 1.7.3 5 3.6 8.3.3l1.4 1.4z"></path>
    </svg>
  </div>
);
