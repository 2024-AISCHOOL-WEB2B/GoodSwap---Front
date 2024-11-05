// src/features/auth/atoms/auth.ts
import { atom } from "jotai";

// 로그인 상태 전역관리 atom
export const isLoggedInAtom = atom(false); // 초기값 false 설정(로그아웃)
