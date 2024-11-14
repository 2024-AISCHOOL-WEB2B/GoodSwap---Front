// src/features/auth/shared/PasswordField.tsx

import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { ShowPasswordIcon } from "../../../shared/assets/icons/ShowPasswordIcon";
import { HidePasswordIcon } from "../../../shared/assets/icons/HidePasswordIcon";
import { ClearInputIcon } from "../../../shared/assets/icons/ClearInputIcon";

type PasswordFieldProps = {
  placeholder?: string;
  name: string;
};

const PasswordField: React.FC<PasswordFieldProps> = ({
  placeholder = "비밀번호",
  name,
}) => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext();

  const [showPassword, setShowPassword] = React.useState(false);
  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  const inputValue = useWatch({ name, defaultValue: "" });

  const handleClearInput = () => {
    setValue(name, "");
  };

  const labelText = name === "password" ? "비밀번호" : "새로운 비밀번호 확인";

  return (
    <div className="mb-4 relative">
      <label htmlFor={name} className="block text-sm mb-2">
        {labelText}
      </label>
      <div className="flex items-center border-b">
        <input
          id={name}
          type={showPassword ? "text" : "password"}
          {...register(name)}
          value={inputValue}
          className="w-full p-2 focus:outline-none"
          placeholder={placeholder}
        />
        {inputValue && (
          <ClearInputIcon
            onClick={handleClearInput}
            className="absolute right-10 top-1/2 transform -translate-y-1/2"
          />
        )}
        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer">
          {showPassword ? (
            <HidePasswordIcon onClick={togglePasswordVisibility} />
          ) : (
            <ShowPasswordIcon onClick={togglePasswordVisibility} />
          )}
        </div>
      </div>
      <div className="text-red-500 text-sm mt-1 min-h-[1.25rem]">
        {errors[name] ? String(errors[name]?.message) : ""}
      </div>
    </div>
  );
};

export { PasswordField };
