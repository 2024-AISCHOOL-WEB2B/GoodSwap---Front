// src/shared/components/BackgroundImage.tsx
import React from "react";

interface BackgroundImageProps {
  src: string;
  alt?: string;
  className?: string;
}

const BackgroundImage: React.FC<BackgroundImageProps> = ({
  src,
  alt = "background",
  className,
}) => {
  return (
    <div className={`absolute inset-0 size-full -z-10 ${className}`}>
      <img className="size-full object-cover" src={src} alt={alt} />
    </div>
  );
};

export { BackgroundImage };
