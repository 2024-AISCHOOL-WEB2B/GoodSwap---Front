// src/features/auth/Modal.tsx
import React from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null; // isOpen이 false일 때는 아무것도 렌더링하지 않음

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="p-6 bg-white rounded">
                <button onClick={onClose} className="absolute top-2 right-2">
                    닫기
                </button>
                {children}
            </div>
        </div>
    );
};

export default Modal;
