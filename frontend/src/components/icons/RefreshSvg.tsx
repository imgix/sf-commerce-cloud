import React from "react";
import styles from "./Icon.module.scss";

export const RefreshSvg = ({ className }: { className?: string }) => (
  <div className={`${styles.container} ${className ? className : ""}`}>
    <svg viewBox="0 0 16 16">
      <path d="M12 4L9 8H11C11 9.7 9.7 11 8 11V13C10.8 13 13 10.8 13 8H15L12 4Z" />
      <path d="M8 5V3C5.2 3 3 5.2 3 8H1L4 12L7 8H5C5 6.3 6.3 5 8 5Z" />
    </svg>
  </div>
);
