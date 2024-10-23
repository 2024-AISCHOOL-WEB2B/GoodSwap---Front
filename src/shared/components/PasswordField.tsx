// src/features/auth/components/PasswordField.tsx

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface PasswordFieldProps {
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

export const PasswordField: React.FC<PasswordFieldProps> = ({
  register,
  errorMessage,
}) => (
  <div className="mb-4">
    <label htmlFor="password" className="block text-sm mb-2">
      비밀번호
    </label>
    <input
      id="password"
      type="password"
      {...register}
      className="w-full p-2 border"
      placeholder="비밀번호"
    />
    {errorMessage && (
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    )}
  </div>
);
