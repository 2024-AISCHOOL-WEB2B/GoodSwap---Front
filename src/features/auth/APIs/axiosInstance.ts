// src/features/auth/APIs/axiosInstance.ts

import axios, { AxiosInstance } from "axios";
import { jwtTokenAtom } from "../atoms/auth";
import { getDefaultStore } from "jotai";

// Axios 인스턴스를 생성하는 함수
export const createAxiosInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  // 요청 인터셉터: JWT 토큰을 Atom에서 가져와 헤더에 추가
  instance.interceptors.request.use(
    (config) => {
      const store = getDefaultStore();
      const token = store.get(jwtTokenAtom); // 최신 JWT 토큰 가져오기
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      console.error("Request error:", error);
      return Promise.reject(error);
    }
  );

  // 응답 인터셉터: Body 또는 Header로 토큰 갱신
  instance.interceptors.response.use(
    (response) => {
      // 1. Header에서 토큰 갱신
      const newTokenHeader = response.headers["authorization"];
      if (newTokenHeader) {
        const accessToken = newTokenHeader.replace("Bearer ", "");
        localStorage.setItem("jwtToken", accessToken);
      }

      // 2. Body에서 토큰 갱신 (Body의 키가 accessToken인 경우)
      if (response.data && response.data.accessToken) {
        localStorage.setItem("jwtToken", response.data.accessToken);
      }

      return response;
    },
    (error) => {
      if (error.response?.status === 403) {
        console.error("Access denied: Unauthorized or invalid token.");
        localStorage.removeItem("jwtToken");
        window.location.href = "/login";
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

// 기본 인스턴스 생성
export const axiosInstance = createAxiosInstance("http://localhost:8081");
