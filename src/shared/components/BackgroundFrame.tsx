import React from 'react';

interface BackgroundFrameProps {
  className?: string;
}

const BackgroundFrame: React.FC<BackgroundFrameProps> = ({ className }) => {
  return (
    <div
      className={`absolute inset-0 w-[768px] h-[1006px] bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}
    />
  );
};

export default BackgroundFrame;
