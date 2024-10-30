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

// 닉네임 유효성 검사 스키마
export const usernameSchema = z.object({
  username: z
    .string()
    .min(1, { message: "닉네임은 최소 1자 이상이어야 합니다." })
    .max(32, { message: "닉네임은 최대 32자까지만 가능합니다." })
    .regex(
      /^[a-zA-Z0-9]+$/,
      "닉네임에는 특수문자나 공백을 사용할 수 없습니다."
    ),
});
