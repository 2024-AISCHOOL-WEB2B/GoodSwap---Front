// src/features/auth/APIs/axiosInstance.ts
import axios from "axios";
import { setAccessToken } from "../utils/tokenUtils"; // 토큰 관리 유틸리티
const apiClient = axios.create({
  baseURL: "http://localhost:8081",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // 쿠키 포함 설정
});
// 401 에러 발생 시 refresh token으로 access token 재발급
export const setupInterceptors = (setLogout: () => void) => {
  apiClient.interceptors.response.use(
    (response) => {
      const accessToken = response.headers["authorization"]?.split(" ")[1];
      if (accessToken) setAccessToken(accessToken); // access token 저장

      return response;
    },
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const { headers } = await axios.post(
            "/auth/refresh",
            {},
            { withCredentials: true }
          );
          const newAccessToken = headers["authorization"]?.split(" ")[1];
          if (newAccessToken) {
            setAccessToken(newAccessToken);
            apiClient.defaults.headers.common["Authorization"] =
              `Bearer ${newAccessToken}`;
          }
          return apiClient(originalRequest);
        } catch (tokenError) {
          setLogout(); // 컴포넌트에서 전달된 로그아웃 함수 호출
          return Promise.reject(tokenError);
        }
      }
      return Promise.reject(error);
    }
  );
};

export { apiClient };
