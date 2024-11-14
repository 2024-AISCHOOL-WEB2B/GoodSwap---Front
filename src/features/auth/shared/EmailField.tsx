// src/features/auth/shared/EmailField.tsx

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ClearInputIcon } from "../../../shared/assets/icons/ClearInputIcon";

type EmailFieldProps = {
  placeholder?: string;
};

const EmailField: React.FC<EmailFieldProps> = ({
  placeholder = "your@email.com",
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const inputValue = useWatch({ name: "email", defaultValue: "" });

  const handleClearInput = () => {
    setValue("email", "");
  };

  return (
    <div className="mb-4 relative">
      <label htmlFor="email" className="block text-sm mb-2">
        이메일
      </label>
      <div className="flex items-center border-b">
        <input
          id="email"
          type="email"
          {...register("email")}
          value={inputValue}
          className="w-full p-2 focus:outline-none"
          placeholder={placeholder}
        />
        {inputValue && (
          <ClearInputIcon
            onClick={handleClearInput}
            className="absolute right-2 top-1/2 transform -translate-y-1/2"
          />
        )}
      </div>
      <div className="text-red-500 text-sm mt-1 min-h-[1.25rem]">
        {errors.email ? String(errors.email.message) : ""}
      </div>
    </div>
  );
};

export { EmailField };
