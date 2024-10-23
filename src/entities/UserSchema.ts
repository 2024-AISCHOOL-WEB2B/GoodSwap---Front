// src/entities/UserSchema.ts

import { z } from "zod";

// 공통 이메일 유효성 검사 함수
const emailValidation = z
  .string()
  .email({ message: "유효한 이메일을 입력해주세요." });

// 공통 비밀번호 유효성 검사 함수
const passwordValidation = z
  .string()
  .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
  .max(32, { message: "비밀번호는 최대 32자까지만 가능합니다." })
  .regex(/[a-zA-Z]/, "비밀번호에는 영문자가 포함되어야 합니다.")
  .regex(/[0-9]/, "비밀번호에는 숫자가 포함되어야 합니다.")
  .regex(/[\W_]/, "비밀번호에는 특수문자가 포함되어야 합니다.");

// 공통 닉네임 유효성 검사 함수
const usernameValidation = z
  .string()
  .min(1, { message: "닉네임은 최소 1자 이상이어야 합니다." })
  .max(32, { message: "닉네임은 최대 32자까지만 가능합니다." })
  .regex(/^[a-zA-Z0-9가-힣]*$/, "특수문자나 공백은 사용할 수 없습니다.");

// 이메일 유효성 검사 스키마 (이메일 스텝에서 사용)
export const emailSchema = z.object({
  email: emailValidation,
});

// 비밀번호 유효성 검사 스키마 (비밀번호 스텝에서 사용)
export const passwordSchema = z.object({
  password: passwordValidation,
});

// 닉네임 유효성 검사 스키마 (닉네임 스텝에서 사용)
export const usernameSchema = z.object({
  username: usernameValidation,
});

// 로그인 전체 폼 유효성 검사 스키마 (로그인 폼에서 사용)
export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});
