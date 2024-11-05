// src/features/auth/APIs/axiosInstance.ts

import axios, { AxiosInstance } from "axios";

// Axios 인스턴스를 생성하는 팩토리 함수
export const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // JWT 토큰을 헤더에 추가하는 요청 인터셉터 설정 (임시 주석 처리)
  /*
  instance.interceptors.request.use(
    (config) => {
      const storedToken = localStorage.getItem("jwtToken");
      if (storedToken) {
        config.headers["Authorization"] = `Bearer ${storedToken}`;
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터를 추가하여 body로 토큰을 받는 경우 처리 (임시 주석 처리)
  instance.interceptors.response.use(
    (response) => {
      if (response.data && response.data.token) {
        localStorage.setItem("jwtToken", response.data.token);
      }
      return response;
    },
    (error) => {
      if (error.response?.status === 403) {
        console.error("Access denied: Unauthorized or invalid token.");
      }
      return Promise.reject(error);
    }
  );
  */

  return instance;
};

// 기본 인스턴스 생성
export const axiosInstance = createAxiosInstance("http://localhost:8081");
