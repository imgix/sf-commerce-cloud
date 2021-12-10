import React, { ReactElement } from "react";
import styles from "./Icon.module.scss";

export const GCSIcon = ({
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
          d="M8 10C9.10457 10 10 9.10457 10 8C10 6.89543 9.10457 6 8 6C6.89543 6 6 6.89543 6 8C6 9.10457 6.89543 10 8 10Z"
          fill="black"
        />
        <path
          d="M2.19995 4L3.89995 7L5.39995 4.5C5.49995 4.2 5.89995 4 6.19995 4H13.7L12.3 1.5C12.1 1.2 11.8 1 11.4 1H4.49995C4.19995 1 3.79995 1.2 3.69995 1.5L2.19995 4Z"
          fill="black"
        />
        <path
          d="M7.50002 15L9.20002 12H6.30002C5.90002 12 5.60002 11.8 5.40002 11.5L1.70002 5.09998L0.300024 7.49998C0.100024 7.79998 0.100024 8.19998 0.300024 8.49998L3.80002 14.5C4.00002 14.8 4.30002 15 4.60002 15H7.50002Z"
          fill="black"
        />
        <path
          d="M14.3 5H10.9L12.3 7.5C12.5 7.8 12.5 8.2 12.3 8.5L8.59998 15H11.4C11.8 15 12.1 14.8 12.3 14.5L15.7 8.5C15.9 8.2 15.9 7.8 15.7 7.5L14.3 5Z"
          fill="black"
        />
      </svg>
    </div>
  );
};
