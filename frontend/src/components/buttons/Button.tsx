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
}
export const Button = ({
  type,
  label,
  onClick,
  Icon,
  flat,
  className,
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
      <div>{Icon}</div>
      {label}
      {_type}
    </button>
  );
};
