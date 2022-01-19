import React from "react";
import ReactDOM from "react-dom";
import styles from "./Portal.module.scss";

interface PortalProps {
  children: React.ReactNode | React.ReactNode[];
  container?: HTMLElement | null;
  className?: string;
}

export default function Portal({
  children,
  container,
  className,
}: PortalProps) {
  const portalWrapper = React.useMemo(() => document.createElement("div"), []);

  React.useEffect(() => {
    const targetNode =
      container && container.appendChild ? container : document.body;

    const classList = [styles.portalContainer];
    if (className) className.split(" ").forEach((item) => classList.push(item));
    classList.forEach((item) => portalWrapper.classList.add(item));

    targetNode.appendChild(portalWrapper);

    // Clean up on unmount
    return () => {
      // Remove element from dom
      targetNode.removeChild(portalWrapper);
    };
  }, [portalWrapper, container, className]);

  return ReactDOM.createPortal(children, portalWrapper);
}
