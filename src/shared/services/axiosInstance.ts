// src/shared/services/axiosInstance.ts

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://your-api-base-url.com", // API의 기본 URL 설정
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true, // CORS 요청 시 인증 정보(쿠키 등) 포함
});

// 토큰을 헤더에 추가하는 인터셉터 설정
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // 토큰을 로컬 스토리지에서 가져옴 (쿠키에 저장 시에는 생략)
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
