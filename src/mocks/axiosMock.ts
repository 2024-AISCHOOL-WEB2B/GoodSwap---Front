// src/mocks/axiosMock.ts

import MockAdapter from "axios-mock-adapter";
import axiosInstance from "../shared/services/axiosInstance";

const mock = new MockAdapter(axiosInstance);

const mockUserData = {
  email: "user@example.com",
  password: "Test@1234",
};

// 로그인 요청에 대한 Mock 응답 설정
mock.onPost("/login").reply((config) => {
  const { email, password } = JSON.parse(config.data);

  console.log("Mock API 호출됨: /login"); // 로그 추가

  // 존재하지 않는 계정인 경우
  if (email !== mockUserData.email) {
    console.log(`존재하지 않는 계정입니다: ${email}`); // 존재하지 않는 계정 로그
    return [404, { error: "존재하지 않는 계정입니다." }];
  }

  // 비밀번호가 틀린 경우
  if (password !== mockUserData.password) {
    console.log(`비밀번호가 틀렸습니다: 입력된 비밀번호는 ${password}`); // 비밀번호 오류 로그
    return [401, { error: "비밀번호가 틀렸습니다. 다시 확인해주세요." }];
  }

  // 로그인 성공
  console.log("로그인 성공"); // 로그인 성공 로그
  return [200, { message: "로그인 성공", token: "mock-token" }];
});

export default mock;
