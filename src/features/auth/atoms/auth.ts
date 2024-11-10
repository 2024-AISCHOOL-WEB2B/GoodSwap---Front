// src/features/auth/atoms/auth.ts

import { atom } from "jotai";

// accessToken 상태 관리용 atom
export const accessTokenAtom = atom<string | null>(null);

// 사용자 로그인 상태를 관리하는 atom
export const isAuthenticatedAtom = atom((get) => Boolean(get(accessTokenAtom)));

// 로그인을 위한 액션을 수행하는 atom
export const loginAtom = atom(null, (get, set, newAccessToken: string) => {
  set(accessTokenAtom, newAccessToken);
});

// 로그아웃을 위한 액션을 수행하는 atom
export const logoutAtom = atom(null, (get, set) => {
  set(accessTokenAtom, null);
});
