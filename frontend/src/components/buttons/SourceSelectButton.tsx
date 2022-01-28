import React from "react";
import { DownArrowSvg, SourceMenuSvg } from "../icons";
import styles from "./SourceSelectButton.module.scss";

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

export const SourceSelectButton = ({
  className,
  flat,
  label,
  leftIconClassName,
  rightIconClassName,
  onClick,
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
      <div
        style={{ width: 21 }}
        className={
          styles.leftIcon + (leftIconClassName ? ` ${leftIconClassName}` : "")
        }
      >
        <SourceMenuSvg />
      </div>
      <div className={styles.label}>{label}</div>
      <div className={styles.spacer}></div>
      <div
        className={
          styles.rightIcon +
          (rightIconClassName ? ` ${rightIconClassName}` : "")
        }
      >
        <DownArrowSvg />
      </div>
    </div>
  );
};
