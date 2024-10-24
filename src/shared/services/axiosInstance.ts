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

// 토큰을 헤더에 추가하는 인터셉터 설정
axiosInstance.interceptors.request.use(
  (config) => {
    try {
      const token = localStorage.getItem("token"); // 로컬 스토리지에서 토큰 가져오기
      if (token) {
        config.headers.Authorization = `Bearer ${token}`; // 토큰이 있으면 Authorization 헤더에 추가
      }
      return config; // 수정된 config 반환
    } catch (error) {
      console.error("Error setting authorization token:", error); // 에러 발생 시 로그 출력
      return config; // 에러 발생 시에도 기본 config 반환
    }
  },
  (error) => {
    console.error("Request error:", error); // 요청 인터셉터 에러 처리
    return Promise.reject(error);
  }
);
