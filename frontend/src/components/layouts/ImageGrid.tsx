import React from "react";
import styles from "./ImageGrid.module.scss";

interface GridProps {
  children: React.ReactChild | React.ReactChild[];
  className?: string;
}

export function ImageGrid({ children, className }: GridProps) {
  return (
    <div className={`${styles.grid} ${className}`}>
      {React.Children.map(children, (element) => 
        React.cloneElement(element, { className: `${styles.gridItem} ${element.props.className || ''}`)
      )}
    </div>
  );
}
