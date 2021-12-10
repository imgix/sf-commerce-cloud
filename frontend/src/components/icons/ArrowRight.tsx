import React from "react";
import styles from "./Icon.module.scss";

export const ArrowRight = () => (
  <div className={styles.container} style={{ transform: "rotate(180deg)" }}>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M14 5H9V2L1 8L9 14V11H14V5Z" />
    </svg>
  </div>
);
