import React from "react";
import styles from "./Icon.module.scss";

export const MetaSvg = ({ className }: { className?: string }) => (
  <div className={`${styles.container} ${className ? className : ""}`}>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 5V3C4.2 3 2 5.2 2 8V13H7V8H4C4 6.3 5.3 5 7 5Z" />
      <path d="M14 5V3C11.2 3 9 5.2 9 8V13H14V8H11C11 6.3 12.3 5 14 5Z" />
    </svg>
  </div>
);
