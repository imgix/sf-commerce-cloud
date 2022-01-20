import React from "react";
import styles from "./ImageGrid.module.scss";

interface GridProps {
  children: React.ReactChild | React.ReactChild[];
  className?: string;
}

export function Grid({ children, className }: GridProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {React.Children.map(children, (child) => (
        <div className={styles.gridItem}>{child}</div>
      ))}
    </div>
  );
}
