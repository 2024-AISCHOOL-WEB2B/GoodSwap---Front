import React from 'react';

interface BackgroundFrameProps {
  className?: string;
}

const BackgroundFrame: React.FC<BackgroundFrameProps> = ({ className }) => {
  return (
    <div
      className={`absolute inset-0 w-[768px] h-[1006px] rounded-lg shadow-lg border border-gray-200 ${className}`}
      style={{
        backgroundColor: '#ffffff', // 흰색 배경 유지
        zIndex: -10,
        pointerEvents: 'none',
      }}
    />
  );
};

export default BackgroundFrame;
