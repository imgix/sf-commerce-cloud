import React, { ReactElement } from "react";
import styles from "./Icon.module.scss";

export const WebProxyIcon = ({
  className,
}: {
  className?: string;
}): ReactElement => {
  return (
    <div className={styles.container + (className ? ` ${className}` : "")}>
      <svg width="16" height="16" viewBox="0 0 16 16">
        <path
          d="M16 2V14H14C13.448 14 13 13.552 13 13V12H3V13C3 13.552 2.552 14 2 14H0V2H2C2.552 2 3 2.448 3 3V4H13V3C13 2.448 13.448 2 14 2H16ZM5 7H3V9H5V7ZM9 7H7V9H9V7ZM13 7H11V9H13V7Z"
          fill="black"
        />
      </svg>
    </div>
  );
};
