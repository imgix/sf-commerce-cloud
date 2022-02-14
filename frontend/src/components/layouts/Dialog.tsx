import React, { ReactElement } from "react";
import { FrameButton } from "../buttons/FrameButton/FrameButton";
import { ArrowRight, DisabledSvg } from "../icons";
import styles from "./Dialog.module.scss";
export function Dialog({
  children,
  onClose,
  text,
  cancelLabel,
  cancelIcon,
  acceptLabel,
  acceptIcon,
  onCancel,
  onAccept,
}: {
  children: React.ReactNode;
  onClose: () => void;
  onCancel?: () => void;
  onAccept: () => void;
  cancelLabel?: string;
  cancelIcon?: ReactElement;
  acceptLabel?: string;
  acceptIcon?: ReactElement;
  text: string;
  open: boolean;
}) {
  return (
    <div className={styles.dialogContainer}>
      <p className={styles.dialogTitle}>{text}</p>
      <div className={styles.dialogChildren}>{children}</div>
      <div className={styles.dialogButtonContainer}>
        <FrameButton
          className={styles.dialogButton}
          icon={cancelIcon || <DisabledSvg />}
          color="primary"
          label={cancelLabel || "Cancel"}
          onClick={onCancel}
        />
        <FrameButton
          className={styles.dialogButton}
          icon={acceptIcon || <ArrowRight />}
          color="secondary"
          label={acceptLabel || "Accept"}
          onClick={onAccept}
        />
      </div>
    </div>
  );
}
