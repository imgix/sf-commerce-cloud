import React, { ReactElement } from "react";
import styles from "./Icon.module.scss";

export const AzureIcon = ({
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
          d="M16 13.5L9.9 2.9L7.6 7.6L11.8 12.4L4 13.4L16 13.5ZM4 5.5L0 12.3L3.4 12L9.4 1L4 5.5Z"
          fill="black"
        />
      </svg>
    </div>
  );
};
