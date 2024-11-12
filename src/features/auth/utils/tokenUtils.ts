// src/features/auth/utils/tokenUtils.ts

// accessToken을 저장하는 메모리 변수
let accessToken: string | null = null;

// accessToken을 설정하고 localStorage에 저장
export const setAccessToken = (token: string | null) => {
  accessToken = token;
  if (token) {
    localStorage.setItem("accessToken", token); // localStorage에 저장
  } else {
    localStorage.removeItem("accessToken"); // null일 경우 삭제
  }
};

// accessToken을 반환하고, 없으면 localStorage에서 불러옴
export const getAccessToken = () => {
  if (!accessToken) {
    accessToken = localStorage.getItem("accessToken"); // localStorage에서 가져오기
  }
  return accessToken;
};
