import React from "react";
import styles from "./Icon.module.scss";

export const ButtonListSvg = ({ className }: { className?: string }) => (
  <div className={`${styles.container} ${className ? className : ""}`}>
    <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
      <g>
        <path d="M4 1H0V5H4V1Z" />
        <path d="M4 6H0V10H4V6Z" />
        <path d="M4 11H0V15H4V11Z" />
        <path d="M16 2H6V4H16V2Z" />
        <path d="M16 7H6V9H16V7Z" />
        <path d="M16 12H6V14H16V12Z" />
      </g>
    </svg>
  </div>
);
