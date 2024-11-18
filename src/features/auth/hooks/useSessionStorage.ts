// src/shared/hooks/useSessionStorage.ts
import { useState, useEffect } from "react";

export function useSessionStorage(key: string, initialValue: string) { // named export로 변경
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      return item ? item : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: string) => {
    try {
      setStoredValue(value);
      sessionStorage.setItem(key, value);
    } catch (error) {
      console.error(error);
    }
  };

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
