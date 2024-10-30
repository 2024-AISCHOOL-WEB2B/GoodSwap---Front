// src/features/auth/utils/validationRules.ts

import { z } from "zod";

// 이메일 유효성 검사 함수
export const createEmailValidation = () =>
  z.string().email({ message: "유효한 이메일을 입력해주세요." });

// 비밀번호 유효성 검사 함수
export const createPasswordValidation = () =>
  z
    .string()
    .min(8, { message: "비밀번호는 최소 8자 이상이어야 합니다." })
    .max(32, { message: "비밀번호는 최대 32자까지만 가능합니다." })
    .regex(/[a-zA-Z]/, "비밀번호에는 영문자가 포함되어야 합니다.")
    .regex(/[0-9]/, "비밀번호에는 숫자가 포함되어야 합니다.")
    .regex(/[\W_]/, "비밀번호에는 특수문자가 포함되어야 합니다.");
