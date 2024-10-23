// src/widgets/Modal.tsx

import React, { ReactNode } from "react";

interface ModalProps {
  isVisible: boolean; // 모달 표시 여부
  onClose: () => void; // 모달 닫기 함수
  children: ReactNode; // 모달 내부에 표시될 내용
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null; // isVisible이 false일 경우 모달을 렌더링하지 않음

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* 모달 배경 및 위치 설정 */}
      <div className="bg-white p-6 rounded shadow-lg text-center">
        {/* 모달 콘텐츠 영역 */}
        {children}
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-gray-800 text-white rounded"
        >
          닫기
        </button>
      </div>
    </div>
  );
};

// Modal 컴포넌트를 named export로 내보내기
export { Modal };
