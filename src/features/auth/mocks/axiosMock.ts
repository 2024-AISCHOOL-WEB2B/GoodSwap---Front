// src/mocks/axiosMock.ts

import MockAdapter from "axios-mock-adapter";
import { axiosInstance } from "../APIs/axiosInstance";

// axiosInstance를 기반으로 MockAdapter 인스턴스 생성
const mock = new MockAdapter(axiosInstance);

// Mock 사용자 데이터
const mockUserData = {
  email: "user@example.com",
  password: "qwer1234!",
};

// 로그인 요청에 대한 Mock 응답 설정
mock.onPost("/login").reply((config) => {
  // 요청 데이터에서 이메일과 비밀번호 추출
  const { email, password } = JSON.parse(config.data);

  // Mock API 호출 로그
  console.log("Mock API 호출됨: /login");

  // 존재하지 않는 계정인 경우
  if (email !== mockUserData.email) {
    console.log(`존재하지 않는 계정입니다: ${email}`);
    return [404, { error: "존재하지 않는 계정입니다." }];
  }

  // 비밀번호가 틀린 경우
  if (password !== mockUserData.password) {
    console.log(`비밀번호가 틀렸습니다: 입력된 비밀번호는 ${password}`);
    return [401, { error: "비밀번호가 틀렸습니다. 다시 확인해주세요." }];
  }

  // 로그인 성공
  console.log("로그인 성공");
  return [200, { message: "로그인 성공", token: "mock-token" }];
});

// mock 인스턴스 내보내기
export { mock };
