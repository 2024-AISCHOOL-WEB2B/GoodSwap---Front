import React, { ReactNode } from "react";

interface ModalProps {
  isVisible: boolean; // 모달 표시 여부
  onClose: () => void; // 모달 닫기 함수
  children: ReactNode; // 모달 내부에 표시될 내용
  buttonText?: string; // 닫기 버튼 텍스트 (기본값: "닫기")
  size?: "small" | "medium" | "large"; // 모달 크기 옵션
}

// Modal 컴포넌트 정의
const Modal: React.FC<ModalProps> = ({
  isVisible,
  onClose,
  children,
  buttonText = "닫기", // 기본 닫기 버튼 텍스트 설정
  size = "medium", // 기본 크기 설정
}) => {
  if (!isVisible) return null; // 모달이 표시되지 않는 경우 null 반환

  // 모달 크기 클래스 설정 함수
  const getSizeClasses = () => {
    switch (size) {
      case "small":
        return "w-1/4 p-4";
      case "large":
        return "w-3/4 p-8";
      default:
        return "w-1/2 p-6";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div
        className={`bg-white rounded shadow-lg text-center ${getSizeClasses()}`}
      >
        {children}
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-gray-800 text-white rounded"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

// React.memo로 컴포넌트 감싸기 및 displayName 설정
const MemoizedModal = React.memo(Modal);
MemoizedModal.displayName = "Modal";

// Modal 컴포넌트를 named export로 내보내기
export { MemoizedModal as Modal };
