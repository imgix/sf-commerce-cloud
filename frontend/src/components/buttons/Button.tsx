import React from "react";
import "../../styles/Button.css";
import { DownArrowSvg } from "../icons/DownArrowSvg";

interface Props {
  label: string;
  type?: "dropdown" | null;
  Icon?: React.ReactElement;
  disabled: boolean;
  onClick?: () => void;
}
export const Button = ({ type, label, onClick, Icon, disabled }: Props) => {
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
      className={`ix-btn ${disabled ? "disabled" : ""}`}
    >
      <div className="ix-btn-icon">{Icon}</div>
      {label}
      {_type}
    </button>
  );
};
