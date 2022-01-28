import React from "react";
import styles from "./Icon.module.scss";

export const S3Icon = ({ className }: { className?: string }) => (
  <div className={`${styles.container} ${className}`}>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 15L0 12V4L7 6V15ZM9 15L16 12V4L9 6V15ZM1 3L8 5L15 3L8.031 1L1 3Z" />
    </svg>
  </div>
);
