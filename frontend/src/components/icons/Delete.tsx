import React from "react";
import styles from "./Icon.module.scss";

export const DeleteIcon = ({ className }: { className?: string }) => (
  <div className={`${styles.container} ${className ? className : ""}`}>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M14.1 4L12.1 2L8.09998 6L4.09998 2L2.09998 4L6.09998 8L2.09998 12L4.09998 14L8.09998 10L12.1 14L14.1 12L10.1 8L14.1 4Z" />
      </g>
    </svg>
  </div>
);
