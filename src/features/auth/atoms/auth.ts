// src/features/auth/atoms/auth.ts

import { atomWithStorage } from "jotai/utils";

// 각 스텝 데이터를 관리하는 Atom - localStorage에 자동 저장
export const emailAtom = atomWithStorage<string>("email", "");
export const passwordAtom = atomWithStorage<string>("password", "");
export const usernameAtom = atomWithStorage<string>("username", "");

// 로그인 상태 전역 관리 atom
export const isLoggedInAtom = atomWithStorage<boolean>("isLoggedIn", false);
