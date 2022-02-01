import React from "react";
import styles from "./Icon.module.scss";

export const ImageSingle = ({ className }: { className?: string }) => (
  <div className={`${styles.container} ${className ? className : ""}`}>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M1 3V13H6H14H15V3H1ZM14 11L10 6L6.6 10.2L5 8L2 12V4H14V11Z" />
        <path d="M4 7C4.55228 7 5 6.55228 5 6C5 5.44772 4.55228 5 4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7Z" />
      </g>
    </svg>
  </div>
);
