import React from "react";
import { DownArrowSvg } from "../icons/DownArrowSvg";
import styles from "./Button.module.scss";

interface Props {
  label: string;
  type?: "dropdown" | null;
  Icon?: React.ReactElement;
  onClick?: () => void;
  flat?: boolean;
  className?: string;
  rightButtonClassName?: string;
}
export const Button = ({
  type,
  label,
  onClick,
  Icon,
  flat,
  className,
  rightButtonClassName,
}: Props) => {
  let _type;

  // in future we can add more types
  switch (type) {
    case "dropdown":
      _type = <DownArrowSvg />;
      break;

    default:
      break;
  }
  return (
    <button
      onClick={onClick}
      className={
        styles.btn +
        (flat ? ` ${styles.flat}` : "") +
        (className ? ` ${className}` : "")
      }
    >
      <div className={styles.icon}>{Icon}</div>
      <div className={styles.label}>{label}</div>
      <div className={styles.spacer}></div>
      <div
        className={
          styles.rightIconButton +
          (rightButtonClassName ? ` ${rightButtonClassName}` : "")
        }
      >
        {_type}
      </div>
    </button>
  );
};
