import { useState, useEffect, useRef } from "react";

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

    document.addEventListener("keydown", handleHide, true);

    if (focusRef.current) {
      focusRef.current.addEventListener("focus", onFocus);
      focusRef.current.addEventListener("blur", onBlur);
    }

    return () => {
      if (focusRef.current) {
        focusRef.current.removeEventListener("focus", onFocus);
        focusRef.current.removeEventListener("blur", onBlur);
      }
      document.removeEventListener("keydown", handleHide, true);
    };
  }, []);

  return { focusRef, isFocused, setIsFocused };
};
