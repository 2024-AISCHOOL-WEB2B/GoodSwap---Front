// src/features/auth/utils/formHandlers.ts
import { apiClient } from "../APIs/axiosInstance";
import sanitizeHtml from "sanitize-html";
import axios from "axios";

export const submitLoginForm = async (
  email: string,
  password: string
): Promise<string> => {
  try {
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedPassword = sanitizeHtml(password);

    const response = await apiClient.post("/auth/login", {
      email: sanitizedEmail,
      password: sanitizedPassword,
    });

    // 응답에서 토큰을 확인할 수 있도록 수정
    const accessToken =
      response.headers["authorization"]?.split(" ")[1] ||
      response.data.accessToken;
    if (!accessToken) {
      throw new Error("Token not found in response");
    }
    return accessToken;
  } catch (error) {
    // 오류 처리
    throw error instanceof Error
      ? error.message
      : "알 수 없는 오류가 발생했습니다.";
  }
};

// 회원가입 폼 제출 함수
export const submitRegistrationForm = async (
  email: string,
  password: string,
  confirmPassword: string,
  username: string
): Promise<string> => {
  try {
    // 데이터 정제
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedPassword = sanitizeHtml(password);
    const sanitizedConfirmPassword = sanitizeHtml(confirmPassword);
    const sanitizedUsername = sanitizeHtml(username);

    // 회원가입 요청
    const response = await axios.post("http://localhost:8081/auth/signup", {
      email: sanitizedEmail,
      password: sanitizedPassword,
      confirmPassword: sanitizedConfirmPassword,
      nickname: sanitizedUsername,
    });

    if (response.status === 201 || response.status === 200) {
      return "회원가입에 성공했습니다.";
    } else {
      throw new Error(response.data.message || "회원가입에 실패했습니다.");
    }
  } catch (error) {
    throw error instanceof Error
      ? error.message
      : "회원가입 중 알 수 없는 오류가 발생했습니다.";
  }
};
