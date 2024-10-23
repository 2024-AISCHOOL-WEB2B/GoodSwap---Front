import { useState, useEffect, useCallback } from "react";

export function useSessionStorage(key: string, initialValue: string) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: string) => {
      try {
        setStoredValue(value);
        sessionStorage.setItem(key, value);
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  useEffect(() => {
    const handleStorageChange = () => {
      const item = sessionStorage.getItem(key);
      if (item) setStoredValue(item);
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key]);

  return [storedValue, setValue] as const;
}
