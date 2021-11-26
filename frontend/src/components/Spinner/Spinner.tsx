import React from "react";
import styles from "./Spinner.module.scss";

export type ISpinnerProps = {
  label?: string;
};

export const Spinner = ({ label }: ISpinnerProps) => {
  return (
    <div className={styles.container}>
      <div className={styles.spinner}>
        <span className={styles.spinnerPip}></span>
        <span className={styles.spinnerPip}></span>
        <span className={styles.spinnerPip}></span>
      </div>
      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
};
