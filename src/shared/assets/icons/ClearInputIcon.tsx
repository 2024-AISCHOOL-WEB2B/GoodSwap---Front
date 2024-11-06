//src/shared/assets/icons/ClearInputIcon.tsx

import React from "react";

export const ClearInputIcon = ({
  onClick,
  className,
}: {
  onClick: () => void;
  className?: string;
}) => (
  <img
    src="/src/shared/assets/icons/clear-input-icon.svg"
    alt="Clear input"
    onClick={onClick}
    className={`cursor-pointer hover:text-custom_magenta ${className}`}
  />
);
