//src/shared/assets/icons/ShowPasswordIcon.tsx

import React from "react";

export const ShowPasswordIcon = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => (
  <img
    src="/src/shared/assets/icons/show-password-icon.svg"
    alt="Show password"
    onClick={onClick}
    className={`cursor-pointer hover:text-custom_magenta ${className}`}
  />
);
