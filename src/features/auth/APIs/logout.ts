// src/features/auth/APIs/logout.ts

import { apiClient } from "./axiosInstance";
import { setAccessToken } from "../utils/tokenUtils";

// 로그아웃 함수
export const logout = async (setLogout: () => void) => {
  try {
    await apiClient.post("/auth/logout", {}, { withCredentials: true });
    setLogout(); // 로그아웃 상태를 업데이트
    setAccessToken(null); // access token 삭제
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
  }
};
