// src/features/auth/APIs/logout.ts

import { apiClient } from "./axiosInstance";
import { setAccessToken, getAccessToken } from "../utils/tokenUtils";

// 로그아웃 함수
export const logout = async (setLogout: () => void) => {
  console.log("logout function is called"); // 로그 추가
  try {
    const accessToken = getAccessToken();
    console.log("Sending logout request with accessToken:", accessToken); // 로그 추가

    await apiClient.post(
      "/auth/logout",
      {},
      {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    setLogout();
    setAccessToken(null);
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
  }
};
