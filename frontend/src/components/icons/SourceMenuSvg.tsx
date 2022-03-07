import React from "react";
import styles from "./Icon.module.scss";

export const SourceMenuSvg = ({ className }: { className?: string }) => (
  <div className={`${styles.container} ${className ? className : ""}`}>
    <svg viewBox="0 0 32 32">
      <path d="M22 26v-3h4v-3h4V6H10v3H6v3H2v14h20zm-1-1.3L14.5 16 10 22l-2.5-3L3 24.7V13h18v11.7zM11.9 12c-.2-.6-.8-1-1.4-1s-1.2.4-1.4 1H7v-2h18v11.7l-3-4V12H11.9zm4-3c-.2-.6-.8-1-1.4-1s-1.2.4-1.4 1H11V7h18v11.7l-3-4V9H15.9z" />
      <circle cx={6.5} cy={15.5} r={1.5} />
    </svg>
  </div>
);
