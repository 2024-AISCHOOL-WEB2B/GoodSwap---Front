// src/features/auth/utils/errorHandlers.ts

export const handleErrorResponse = (statusCode: number): string => {
  switch (statusCode) {
    case 404:
      return "존재하지 않는 계정이거나 비밀번호가 틀렸습니다.";
    case 401:
      return "인증에 실패했습니다. 다시 시도해주세요.";
    default:
      return "서버 오류가 발생했습니다.";
  }
};
