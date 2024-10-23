// src/shared/utils/requestHandler.ts

import { axiosInstance } from "../../shared/services";

// 요청 처리기 함수
export const requestHandler = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE", // 허용할 HTTP 메서드 타입을 명시합니다.
  data?: T // 요청에 보낼 데이터 (선택 사항, POST/PUT 시 사용)
): Promise<T> => {
  try {
    // axiosInstance를 사용하여 요청을 보냄
    const response = await axiosInstance({
      url,
      method,
      data, // 요청에 포함할 데이터 (선택 사항)
    });
    return response.data; // 성공 시 응답 데이터를 반환
  } catch (error) {
    throw error; // 에러 발생 시 에러를 던져 호출한 곳에서 처리하도록 함
  }
};
