import { useEffect, useRef, useState } from "react";

export const useFocus = (defaultState: boolean = false) => {
  const [isFocused, setIsFocused] = useState(defaultState);
  const focusRef = useRef<HTMLInputElement>(null);

  const handleHide = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsFocused(false);
      focusRef.current?.blur();
    }
  };

  useEffect(() => {
    const onFocus = () => setIsFocused(true);
    const onBlur = () => setIsFocused(false);
    const currentRef = focusRef.current;

    document.addEventListener("keydown", handleHide, true);

    if (currentRef) {
      currentRef.addEventListener("focus", onFocus);
      currentRef.addEventListener("blur", onBlur);
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("focus", onFocus);
        currentRef.removeEventListener("blur", onBlur);
      }
      document.removeEventListener("keydown", handleHide, true);
    };
  }, []);

  return { focusRef, isFocused, setIsFocused };
};
