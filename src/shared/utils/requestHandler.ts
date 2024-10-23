// src/shared/utils/requestHandler.ts

import { axiosInstance } from "../../shared/services";

// 요청 처리기 함수
export const requestHandler = async <T>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE", // 허용할 HTTP 메서드 타입을 명시합니다.
  data?: T // 요청에 보낼 데이터 (선택 사항)
): Promise<T> => {
  try {
    const response = await axiosInstance({
      url,
      method,
      data,
    });
    return response.data; // 응답 데이터를 반환합니다.
  } catch (error) {
    throw error; // 에러 발생 시 에러를 던집니다.
  }
};
