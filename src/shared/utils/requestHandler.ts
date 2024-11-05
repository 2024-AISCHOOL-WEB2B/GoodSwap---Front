// src/shared/utils/requestHandler.ts

import { axiosInstance } from "../../features/auth/APIs/axiosInstance";
import axios from "axios";

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
    if (axios.isAxiosError(error)) {
      // 네트워크 오류 처리
      if (!error.response) {
        console.error(
          `Network error occurred while making a request to "${url}":`,
          error
        );
        throw new Error(
          "네트워크 오류가 발생했습니다. 인터넷 연결을 확인해주세요."
        );
      }

      // 서버 응답에 따른 오류 처리
      console.error(
        `Error response from server for request to "${url}" with status code ${error.response.status}:`,
        error.response.data
      );
      throw new Error("서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } else {
      // 예상치 못한 오류 처리
      console.error(
        `Unexpected error occurred while making a request to "${url}":`,
        error
      );
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
};
