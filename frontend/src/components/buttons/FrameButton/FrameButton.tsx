import React, { ReactElement } from "react";
import styles from "./FrameButton.module.scss";

type Props = {
  className?: string;
  color?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  frameless?: boolean;
  icon?: ReactElement;
  iconPosition?: "left" | "right";
  label?: string;
  noFill?: boolean;
  size?: "small" | "large";
  type?: "button" | "submit" | "reset";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function FrameButton({
  className,
  color = "primary",
  disabled,
  frameless,
  icon,
  iconPosition = "left",
  label,
  noFill,
  size = "large",
  type = "button",
  onClick,
}: Props) {
  // if label is not provided, display a button with only the icon
  // otherwise, display a button with icon and label
  const buttonStyles = [
    styles.button,
    styles[color],
    styles[(disabled && "disabled") || " "],
    styles[(frameless && "frameless") || ""],
    styles[(icon && " ") || "noIcon"],
    styles[size],
    styles[(label && " ") || "iconOnly"],
    styles[(noFill && "noFill") || " "],
    className,
  ]
    .toString()
    .replace(/,/g, " ");
  return iconPosition === "left" ? (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {icon}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  ) : (
    <button
      type={type}
      className={buttonStyles}
      disabled={disabled}
      onClick={onClick}
    >
      {label && <span className={styles.label}>{label}</span>}
      {icon}
    </button>
  );
}
