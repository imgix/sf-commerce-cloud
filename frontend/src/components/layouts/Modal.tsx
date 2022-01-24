import React from "react";
import styles from "./Modal.module.scss";
import Portal from "./Portal";

interface ModalProps {
  children: React.ReactNode | React.ReactNode[];
  locked: boolean; // cant be closed by clicking outside if true
  open: boolean;
  onClose: () => void;
}

export function Modal({ children, locked, open, onClose }: ModalProps) {
  const backdrop = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const { current } = backdrop;

    const keyHandler = (e: KeyboardEvent) => e.key == "Escape" && onClose();

    const clickHandler = (e: MouseEvent) =>
      !locked && e.target === current && onClose();

    if (current) {
      current.addEventListener("click", clickHandler);
      window.addEventListener("keyup", keyHandler);
    }

    if (open) {
      window.setTimeout(() => {
        const activeElement = document?.activeElement as HTMLElement;
        if (activeElement) activeElement.blur();
      }, 10);
    }

    return () => {
      if (current) {
        current.removeEventListener("click", clickHandler);
      }

      window.removeEventListener("keyup", keyHandler);
    };
  }, [open, locked, onClose]);

  console.log("[imgix] Modal", open ? "opened" : "closed");

  return (
    <>
      {open && (
        <Portal>
          <div
            ref={backdrop}
            className={`${styles.backdrop} ${open && styles.active}`}
          >
            <div className={`${styles.content} ${styles["modal-content"]}`}>
              {children}
            </div>
          </div>
        </Portal>
      )}
    </>
  );
}
