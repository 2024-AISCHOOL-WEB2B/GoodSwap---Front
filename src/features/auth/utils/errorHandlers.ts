// src/shared/utils/errorHandlers.ts

// 서버 응답에 따른 에러 메시지 처리 함수
export const handleErrorResponse = (statusCode: number) => {
  switch (statusCode) {
    case 404:
      return "존재하지 않는 계정입니다.";
    case 401:
      return "비밀번호가 틀렸습니다. 다시 확인해주세요.";
    default:
      return "서버 오류가 발생했습니다.";
  }
};
