import React, { ReactElement } from "react";
import styles from "./FrameButton.module.scss";

type Props = {
  icon: ReactElement;
  color?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  framed?: boolean;
  onClick?: () => void;
  size?: "small" | "large";
  text?: string;
};

export function FrameButton({
  color = "primary",
  disabled,
  framed = true,
  icon,
  onClick,
  size = "large",
  text,
}: Props) {
  // if label is not provided, display a button with only the icon
  // otherwise, display a button with icon and label
  const buttonStyles = [
    styles.button,
    styles[color],
    styles[(disabled && "disabled") || " "],
    styles[(framed && " ") || "frameless"],
    styles[(icon && " ") || "noIcon"],
    styles[size],
    styles[(text && " ") || "iconOnly"],
  ]
    .toString()
    .replace(/,/g, " ");
  return text ? (
    <button className={buttonStyles} disabled={disabled} onClick={onClick}>
      {icon}
      <span className="label">{text}</span>
    </button>
  ) : (
    <button className={buttonStyles} disabled={disabled} onClick={onClick}>
      {icon}
    </button>
  );
}
