// src\widgets\Modal.tsx
import React from 'react';

export interface ModalProps {
    // export 추가
    isOpen: boolean;
    onClose: () => void;
    onRegister: (name: string, phone: string, address: string) => void;
    children?: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onRegister, children }) => {
    // export 추가
    const [name, setName] = React.useState('');
    const [phone, setPhone] = React.useState('');
    const [address, setAddress] = React.useState('');

    const handleRegister = () => {
        onRegister(name, phone, address);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
            <div className="p-6 bg-white rounded">
                <h2 className="mb-4 text-xl font-semibold">배송 정보 등록</h2>
                {children ? (
                    children
                ) : (
                    <>
                        <input
                            type="text"
                            placeholder="이름"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full p-2 mb-4 border"
                        />
                        <input
                            type="text"
                            placeholder="연락처"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full p-2 mb-4 border"
                        />
                        <input
                            type="text"
                            placeholder="주소"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full p-2 mb-6 border"
                        />
                        <div className="flex justify-between">
                            <button onClick={handleRegister} className="w-[48%] p-2 text-white bg-blue-500 rounded">
                                등록
                            </button>
                            <button onClick={onClose} className="w-[48%] p-2 text-white bg-gray-500 rounded">
                                닫기
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};
