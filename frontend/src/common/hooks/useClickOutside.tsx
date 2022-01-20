import { useState, useEffect, useRef } from "react";

export function useClickOutside(initialIsVisible: boolean) {
  const [isVisible, setIsVisible] = useState(initialIsVisible);
  const visibleRef = useRef<HTMLDivElement>(null);

  const handleHide = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsVisible(false);
    }
  };

  const handleClickOutside = (event: Event) => {
    if (
      visibleRef.current &&
      !visibleRef.current.contains(event.target as Node)
    ) {
      setIsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleHide, true);
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("keydown", handleHide, true);
      document.removeEventListener("click", handleClickOutside, true);
    };
  });

  return { visibleRef, isVisible, setIsVisible };
}
