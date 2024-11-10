// src/features/auth/utils/formHandlers.ts
import { apiClient } from "../APIs/axiosInstance";
import sanitizeHtml from "sanitize-html";

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
