// src/features/auth/atoms/auth.ts
import { atom } from "jotai";

// 로그인 상태 전역 관리 atom
export const isLoggedInAtom = atom(false); // 초기값을 false로 설정 (로그아웃 상태)

// 로그인 상태를 로컬 스토리지를 통해 관리
export const setIsLoggedInAtom = atom(null, (get, set, newValue: boolean) => {
  set(isLoggedInAtom, newValue); // 로그인 상태를 업데이트
});
