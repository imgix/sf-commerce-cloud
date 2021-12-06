import React from "react";
import styles from "./Button.module.scss";

interface Props {
  label: string;
  leftIcon?: React.ReactElement;
  leftIconClassName?: string;
  rightIcon?: React.ReactElement;
  rightIconClassName?: string;
  className?: string;
  flat?: boolean;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}
export const Button = ({
  label,
  onClick,
  leftIcon,
  rightIcon,
  flat,
  className,
  rightIconClassName,
  leftIconClassName,
}: Props) => {
  return (
    <div
      onClick={onClick}
      className={
        styles.btn +
        (flat ? ` ${styles.flat}` : "") +
        (className ? ` ${className}` : "")
      }
    >
      {leftIcon && (
        <div
          className={
            styles.leftIcon + (leftIconClassName ? ` ${leftIconClassName}` : "")
          }
        >
          {leftIcon}
        </div>
      )}
      <div className={styles.label}>{label}</div>
      <div className={styles.spacer}></div>
      {rightIcon && (
        <div
          className={
            styles.rightIcon +
            (rightIconClassName ? ` ${rightIconClassName}` : "")
          }
        >
          {rightIcon}
        </div>
      )}
    </div>
  );
};
