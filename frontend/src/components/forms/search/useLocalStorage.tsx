import { useState } from "react";

// Based off of https://usehooks.com/useLocalStorage/
// Like useState except accepts a key and checks localStorage for the value
export function useLocalStorage(key: string, initialValue: any) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that
  // persists the new value to localStorage.
  const setValue = (value: Function | Object) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      // Save to local storage so that on page refresh we can get it back
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // TODO: handle errors
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
