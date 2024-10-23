// src/widgets/Modal.tsx

import React, { ReactNode } from "react";

interface ModalProps {
  isVisible: boolean; // 모달 표시 여부
  onClose: () => void; // 모달 닫기 함수
  children: ReactNode; // 모달 내부에 표시될 내용
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose, children }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded shadow-lg text-center">
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

export { Modal };
