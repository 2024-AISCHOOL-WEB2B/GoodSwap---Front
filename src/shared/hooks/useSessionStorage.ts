// src/shared/hooks/useSessionStorage.ts

import { useState, useEffect, useCallback } from "react";

// useSessionStorage 훅: 세션 스토리지를 사용해 값을 저장하고, 값의 변경을 감지하여 동기화하는 기능을 제공
export function useSessionStorage(key: string, initialValue: string) {
  // 세션 스토리지에서 값을 가져오고, 없으면 초기값을 설정
  const [storedValue, setStoredValue] = useState<string>(() => {
    try {
      // sessionStorage에서 key에 해당하는 값을 가져옴
      return sessionStorage.getItem(key) ?? initialValue;
    } catch (error) {
      // sessionStorage 접근 중 에러 발생 시 초기값을 반환
      console.error("Error accessing sessionStorage:", error);
      return initialValue;
    }
  });

  // 세션 스토리지와 값을 동기화하는 함수
  const setValue = useCallback(
    (value: string) => {
      try {
        // 상태 값 업데이트
        setStoredValue(value);
        // sessionStorage에 새로운 값 저장
        sessionStorage.setItem(key, value);
      } catch (error) {
        // 값 설정 중 에러 발생 시 콘솔에 출력
        console.error("Error setting sessionStorage value:", error);
      }
    },
    [key] // key가 변경될 때마다 함수 재생성
  );

  // 세션 스토리지의 값이 변경되었을 때 동기화하는 useEffect
  useEffect(() => {
    const handleStorageChange = () => {
      try {
        // sessionStorage에서 현재 key에 해당하는 값을 가져옴
        const item = sessionStorage.getItem(key);
        // 값을 업데이트하거나, 없으면 초기값으로 설정
        setStoredValue(item ?? initialValue);
      } catch (error) {
        // 변경 감지 중 에러 발생 시 콘솔에 출력
        console.error("Error reading sessionStorage on change:", error);
      }
    };

    // 스토리지 변경 이벤트 리스너 등록
    window.addEventListener("storage", handleStorageChange);
    return () => {
      // 컴포넌트가 언마운트될 때 리스너 제거
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]); // key와 initialValue가 변경될 때마다 useEffect 재실행

  // 현재 저장된 값과 값을 설정하는 함수를 반환
  return [storedValue, setValue] as const;
}
