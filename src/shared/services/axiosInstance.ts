// src/shared/services/axiosInstance.ts

import axios from "axios";

// axios 인스턴스 생성 및 기본 설정
export const axiosInstance = axios.create({
  baseURL: "https://your-api-base-url.com", // API의 기본 URL 설정
  headers: {
    "Content-Type": "application/json", // 요청 헤더에 JSON 형식 지정
    Accept: "application/json", // 응답 형식으로 JSON을 기대
  },
  withCredentials: true, // CORS 요청 시 인증 정보(쿠키 등) 포함
});

// 요청 인터셉터 설정: 모든 요청에 토큰을 헤더에 추가
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // 토큰을 로컬 스토리지에서 가져옴 (쿠키에 저장 시에는 생략)
  if (token) {
    // 토큰이 있으면 Authorization 헤더에 추가
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config; // 수정된 config 반환
});
