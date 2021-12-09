import React, { ReactElement } from "react";
import styles from "./Icon.module.scss";

export const WebFolderIcon = ({
  className,
}: {
  className?: string;
}): ReactElement => {
  return (
    <div className={styles.container + (className ? ` ${className}` : "")}>
      <svg
        width="16"
        height="16"
        viewBox="0 0 16 16"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M16 13C16 13.552 15.552 14 15 14H2V6C2 5.448 2.448 5 3 5H16V13Z"
          fill="black"
        />
        <path
          d="M4 3C4 2.448 3.552 2 3 2H1C0.448 2 0 2.448 0 3V13C0 13.552 0.448 14 1 14V5C1 4.448 1.448 4 2 4H14C14 3.448 13.552 3 13 3H4Z"
          fill="black"
        />
      </svg>
    </div>
  );
};
