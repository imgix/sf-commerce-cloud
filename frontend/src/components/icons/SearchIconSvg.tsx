import React from "react";
import styles from "./Icon.module.scss";
export const SearchIconSvg = ({ className }: { className?: string }) => (
  <div className={`${styles.container} ${className ? className : ""}`}>
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
      <g>
        <path d="M16 14L11.12 9.12C11.67 8.21 12 7.14 12 6C12 2.69 9.31 0 6 0C2.69 0 0 2.69 0 6C0 9.31 2.69 12 6 12C7.14 12 8.21 11.67 9.12 11.12L14 16L16 14ZM6 10C3.79 10 2 8.21 2 6C2 3.79 3.79 2 6 2C8.21 2 10 3.79 10 6C10 8.21 8.21 10 6 10Z" />
      </g>
    </svg>
  </div>
);
