// src/features/auth/utils/tokenUtils.ts

// accessToken을 저장하는 메모리 변수
let accessToken: string | null = null;

// accessToken을 설정
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// accessToken을 반환
export const getAccessToken = () => accessToken;

// refreshToken은 쿠키에 저장되어 있으므로, 이 유틸에서는 접근하지 않음
