import React from "react";
import styles from "./Icon.module.scss";

export const AddSvg = ({ className }: { className?: string }) => (
  <div className={`${styles.container} ${className ? className : ""}`}>
    <svg viewBox="0 0 16 16">
      <polygon points="15,6 10,6 10,1 6,1 6,6 1,6 1,10 6,10 6,15 10,15 10,10 15,10 " />
    </svg>
  </div>
);
