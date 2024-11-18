//src/shared/assets/icons/HidePasswordIcon.tsx

import React from "react";

export const HidePasswordIcon = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => (
  <img
    src="/src/shared/assets/icons/hide-password-icon.svg"
    alt="Hide password"
    onClick={onClick}
    className={`cursor-pointer hover:text-custom_magenta ${className}`}
  />
);
