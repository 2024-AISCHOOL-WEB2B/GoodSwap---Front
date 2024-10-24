// src/features/auth/utils/formHandlers.ts

import { axiosInstance } from "../../../shared/services";
import sanitizeHtml from "sanitize-html";
import axios from "axios";
import { handleErrorResponse } from "../../../shared/utils";

// 로그인 폼 제출 함수
export const submitLoginForm = async (
  email: string,
  password: string,
  // 성공 시 호출할 콜백 함수
  onSuccess: () => void,
  // 오류 발생 시 호출할 콜백 함수
  onError: (errorMessage: string) => void
) => {
  try {
    // 이메일과 비밀번호를 HTML로부터 안전하게 정제
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedPassword = sanitizeHtml(password);

    // 로그인 요청을 서버에 보냄
    const loginResponse = await axiosInstance.post("/login", {
      email: sanitizedEmail,
      password: sanitizedPassword,
    });

    // 요청이 성공적으로 완료되었을 때
    if (loginResponse.status === 200) {
      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("token", loginResponse.data.token);
      onSuccess(); // 성공 시 호출
    }
  } catch (error) {
    // Axios 오류 처리
    if (axios.isAxiosError(error) && error.response) {
      // 서버 응답 상태 코드에 따라 오류 메시지 처리
      onError(handleErrorResponse(error.response.status));
    } else if (error instanceof Error) {
      onError(error.message); // 일반적인 JS 오류 처리
    } else {
      onError("알 수 없는 오류가 발생했습니다."); // 기타 오류에 대한 기본 메시지
    }
  }
};
