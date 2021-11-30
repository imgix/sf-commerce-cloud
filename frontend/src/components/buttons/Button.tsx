import React from "react";
import "../../styles/Button.css";
import { DownArrowSvg } from "../icons/DownArrowSvg";
import styles from "./Button.module.scss";

interface Props {
  label: string;
  type?: "dropdown" | null;
  Icon?: React.ReactElement;
  onClick?: () => void;
}
export const Button = ({ type, label, onClick, Icon }: Props) => {
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
    <button onClick={onClick} className={styles.btn}>
      <div>{Icon}</div>
      {label}
      {_type}
    </button>
  );
};
