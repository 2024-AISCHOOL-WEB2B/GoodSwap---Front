// src/features/auth/components/EmailField.tsx

import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";

interface EmailFieldProps {
  register: UseFormRegisterReturn;
  errorMessage?: string;
}

export const EmailField: React.FC<EmailFieldProps> = ({
  register,
  errorMessage,
}) => (
  <div className="mb-4">
    <label htmlFor="email" className="block text-sm mb-2">
      이메일
    </label>
    <input
      id="email"
      type="email"
      {...register}
      className="w-full p-2 border"
      placeholder="your@email.com"
    />
    {errorMessage && (
      <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
    )}
  </div>
);
