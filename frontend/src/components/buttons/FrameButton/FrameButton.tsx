import React, { ReactElement } from "react";
import styles from "./FrameButton.module.scss";

type Props = {
  className?: string;
  type?: "primary" | "secondary" | "tertiary";
  disabled?: boolean;
  frameless?: boolean;
  icon?: ReactElement;
  iconPosition?: "left" | "right";
  label?: string;
  noFill?: boolean;
  size?: "small" | "large";
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
};

export function FrameButton({
  className,
  type = "primary",
  disabled,
  frameless,
  icon,
  iconPosition = "left",
  label,
  noFill,
  size = "large",
  onClick,
}: Props) {
  // if label is not provided, display a button with only the icon
  // otherwise, display a button with icon and label
  const buttonStyles = [
    styles.button,
    styles[type],
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
    <button className={buttonStyles} disabled={disabled} onClick={onClick}>
      {icon}
      {label && <span className={styles.label}>{label}</span>}
    </button>
  ) : (
    <button className={buttonStyles} disabled={disabled} onClick={onClick}>
      {label && <span className={styles.label}>{label}</span>}
      {icon}
    </button>
  );
}
