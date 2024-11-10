// src/features/auth/atoms/auth.ts

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

// 각 스텝 데이터를 관리하는 Atom - localStorage에 자동 저장
export const emailAtom = atomWithStorage<string>("email", "");
export const passwordAtom = atomWithStorage<string>("password", "");
export const usernameAtom = atomWithStorage<string>("username", "");

// JWT 토큰을 저장하는 atomWithStorage - localStorage와 동기화
export const jwtTokenAtom = atomWithStorage<string | null>("jwtToken", null);

// 로그인 상태를 관리하는 atom - jwtTokenAtom의 존재 여부로 판단
export const isLoggedInAtom = atom<boolean>((get) => !!get(jwtTokenAtom));
