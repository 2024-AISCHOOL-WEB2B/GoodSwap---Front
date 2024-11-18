// src/features/auth/entities/UserSchema.ts

import { z } from "zod";
import {
  createEmailValidation,
  createPasswordValidation,
} from "../utils/validationRules";

// 로그인 입력값 유효성 검사 스키마
export const loginSchema = z.object({
  // 유효성 검사를 위한 함수 호출
  email: createEmailValidation(),
  password: createPasswordValidation(),
});

// 로그인 입력값 타입 추론
export type LoginSchema = z.infer<typeof loginSchema>;

// 닉네임 유효성 검사 스키마
export const usernameSchema = z.object({
  username: z
    .string()
    .min(5, { message: "닉네임은 최소 5자 이상이어야 합니다." })
    .max(32, { message: "닉네임은 최대 32자까지만 가능합니다." })
    .regex(
      /^[a-zA-Z0-9]+$/,
      "닉네임에는 특수문자나 공백을 사용할 수 없습니다."
    ),
});

// 닉네임 스키마 타입 추론
export type UsernameSchema = z.infer<typeof usernameSchema>;

// 비밀번호 및 비밀번호 확인 유효성 검사 스키마
export const passwordConfirmationSchema = z
  .object({
    password: createPasswordValidation(),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

// 비밀번호 확인 스키마 타입 추론
export type PasswordConfirmationSchema = z.infer<
  typeof passwordConfirmationSchema
>;

// 비밀번호 재설정 이메일 유효성 검사 스키마 추가
export const resetPasswordSchema = z.object({
  email: createEmailValidation(),
  resetCode: z.string().optional(),
});
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;
