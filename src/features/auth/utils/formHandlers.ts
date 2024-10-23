import axiosInstance from "../../../shared/services/axiosInstance";
import sanitizeHtml from "sanitize-html";
import axios from "axios";
import { handleErrorResponse } from "../../../shared/utils";

export const submitLoginForm = async (
  email: string,
  password: string,
  onSuccess: () => void,
  onError: (errorMessage: string) => void
) => {
  try {
    const sanitizedEmail = sanitizeHtml(email);
    const sanitizedPassword = sanitizeHtml(password);

    const loginResponse = await axiosInstance.post("/login", {
      email: sanitizedEmail,
      password: sanitizedPassword,
    });

    if (loginResponse.status === 200) {
      localStorage.setItem("token", loginResponse.data.token);
      onSuccess(); // 성공 시 호출
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      onError(handleErrorResponse(error.response.status));
    } else if (error instanceof Error) {
      onError(error.message);
    } else {
      onError("알 수 없는 오류가 발생했습니다.");
    }
  }
};
