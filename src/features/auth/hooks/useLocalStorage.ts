// src/features/auth/hooks/useLocalStorage.ts

import { useState, useEffect, useCallback } from "react";

// useLocalStorage 훅: 로컬 스토리지를 사용해 값을 저장하고, 값의 변경을 감지하여 동기화하는 기능을 제공
// - `key`: 로컬 스토리지에 저장할 키 값
// - `initialValue`: 초기값을 설정하여, 로컬 스토리지에 값이 없을 때 사용할 기본 값
export function useLocalStorage(key: string, initialValue: string) {
  // 로컬 스토리지에서 값을 가져오고, 없으면 초기값을 설정
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      return localStorage.getItem(key) ?? initialValue;
    } catch (error) {
      console.error(`Error accessing localStorage for key "${key}":`, error);
      return initialValue;
    }
  });

  // 로컬 스토리지를 업데이트하고 값의 변경을 동기화하는 함수
  const setValue = useCallback(
    (value: string) => {
      try {
        setStoredValue(value);
        localStorage.setItem(key, value); // 로컬 스토리지에 새로운 값 저장
      } catch (error) {
        console.error(
          `Error setting localStorage value for key "${key}":`,
          error
        );
      }
    },
    [key]
  );

  // 로컬 스토리지의 값이 변경되었을 때 이를 동기화하는 useEffect
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        const item = localStorage.getItem(key);
        setStoredValue(item ?? initialValue); // 값을 업데이트하거나 초기값 설정
      } catch (error) {
        console.error(
          `Error reading localStorage on change for key "${key}":`,
          error
        );
      }
    };

    // 스토리지 변경 이벤트 리스너 등록
    window.addEventListener("storage", handleStorageChange);
    return () => {
      // 컴포넌트가 언마운트될 때 리스너 제거
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  // 현재 저장된 값과 값을 설정하는 함수를 반환
  return [storedValue, setValue] as const;
}
