// src\features\payment\components\PaymentForm.tsx

import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { orderInfoAtom } from '../../atoms/orderAtom';
import { Modal } from '../../../widgets/Modal';

export const PaymentForm = () => {
    const [orderInfo, setOrderInfo] = useAtom(orderInfoAtom);
    const [coupon, setCoupon] = useState('');
    const [points, setPoints] = useState(0); // 초기 포인트는 0
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태
    const [paymentMethod, setPaymentMethod] = useState(''); // 결제 방법 선택

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderInfo({
            ...orderInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleCouponApply = () => {
        setOrderInfo({ ...orderInfo, totalAmount: orderInfo.totalAmount - 0 });
    };

    const handlePointsApply = () => {
        setOrderInfo({ ...orderInfo, totalAmount: orderInfo.totalAmount - points });
    };

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    return (
        <div className="flex max-w-4xl p-6 mx-auto bg-gray-100">
            {/* 좌측 영역 */}
            <div className="w-2/3 pr-8">
                {/* 배송지 정보 */}
                <div className="p-4 mt-4 mb-6 bg-white border">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold">배송 정보</h2>
                        <button onClick={openModal} className="px-3 py-1 text-white bg-blue-500 rounded">
                            등록
                        </button>
                    </div>
                    <div className="p-4 mb-6 bg-white border">
                        {orderInfo.deliveryName} <br />
                        {orderInfo.deliveryPhone} <br />
                        {orderInfo.address}
                    </div>

                    <input
                        type="text"
                        name="deliveryMemo"
                        placeholder="배송 메모를 선택해 주세요."
                        value={orderInfo.deliveryMemo || ''}
                        onChange={handleInputChange}
                        className="w-full p-2 mt-4 border"
                    />
                </div>

                {/* 결제 방법 선택 */}
                <div className="p-4 mb-6 bg-white border">
                    <h2 className="font-semibold">결제 방법</h2>
                    <div>
                        <label className="block">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="easyPayment"
                                checked={paymentMethod === 'easyPayment'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            간편 결제
                        </label>
                        <label className="block">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="generalPayment"
                                checked={paymentMethod === 'generalPayment'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            일반 결제
                        </label>
                        <label className="block">
                            <input
                                type="radio"
                                name="paymentMethod"
                                value="kakaoPay"
                                checked={paymentMethod === 'kakaoPay'}
                                onChange={(e) => setPaymentMethod(e.target.value)}
                                className="mr-2"
                            />
                            카카오페이
                        </label>
                    </div>
                </div>

                {/* 선택한 결제 방법에 따라 다른 UI 렌더링 */}
                {paymentMethod === 'easyPayment' && (
                    <div className="p-4 mb-6 bg-white border">
                        <h2 className="font-semibold">카드 간편결제</h2>
                        <div className="flex items-center">
                            <button className="flex items-center justify-center w-1/2 p-4 bg-gray-100 border">
                                <span className="text-green-500">+</span> 카드 등록하기
                            </button>
                        </div>
                    </div>
                )}

                {/* 쿠폰/포인트 */}
                <div className="p-4 mb-6 bg-white border">
                    <h2 className="font-semibold">쿠폰/포인트</h2>
                    <div className="flex mb-4">
                        <input
                            type="text"
                            placeholder="쿠폰 코드"
                            value={coupon}
                            onChange={(e) => setCoupon(e.target.value)}
                            className="w-2/3 p-2 border"
                        />
                        <button onClick={handleCouponApply} className="w-1/3 p-2 ml-2 text-white bg-blue-500">
                            쿠폰 적용
                        </button>
                    </div>
                    <div className="flex">
                        <input
                            type="number"
                            placeholder="포인트 사용"
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value))}
                            className="w-2/3 p-2 border"
                        />
                        <button onClick={handlePointsApply} className="w-1/3 p-2 ml-2 text-white bg-blue-500">
                            포인트 적용
                        </button>
                    </div>
                    <div className="mt-2">보유 포인트: {points.toLocaleString()}원</div> {/* 입력된 포인트 값 표시 */}
                </div>
            </div>

            {/* 우측 영역 (주문 상품 정보, 최종 결제 금액) */}
            <div className="w-1/3 h-full p-4 bg-white border">
                {/* 주문 상품 정보 */}
                <div className="p-4 mb-6 bg-white border">
                    <h2 className="font-semibold">주문 상품 정보</h2>
                    <div className="flex mt-4">
                        <img src="/path/to/product-image.jpg" alt="Product" className="w-16 h-16 mr-4" />
                        <div>
                            <div className="">상품명</div>
                            <div>갯수</div>
                            <div>가격</div>
                        </div>
                    </div>
                </div>

                {/* 최종 결제 금액 */}
                <div className="mb-6">
                    <h2 className="font-semibold">최종 결제 금액</h2>
                    <div className="mt-4">
                        <div className="flex justify-between">
                            <span>상품가격</span>
                            <span>{orderInfo.totalAmount.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between">
                            <span>쿠폰 할인</span>
                            <span>원</span>
                        </div>
                        <div className="flex justify-between">
                            <span>포인트 사용</span>
                            <span>-{points.toLocaleString()}원</span>
                        </div>
                        <div className="flex justify-between">
                            <span>배송비</span>
                            <span>원</span>
                        </div>
                        <div className="flex justify-between font-bold">
                            <span>총 결제 금액</span>
                            <span>{(orderInfo.totalAmount - points).toLocaleString()}원</span>
                        </div>
                    </div>
                </div>

                {/* 결제하기 버튼 */}
                <button className="w-full p-4 font-bold text-white bg-blue-500">결제하기</button>
            </div>

            {/* 모달 창 */}
            {isModalOpen && (
                <Modal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onRegister={function (name: string, phone: string, address: string): void {
                        throw new Error('Function not implemented.');
                    }}
                >
                    <div className="p-6 bg-white rounded">
                        <h2 className="mb-4 text-xl font-semibold">배송 정보 등록</h2>
                        {/* 모달 내용 */}
                        <input
                            type="text"
                            name="deliveryName"
                            placeholder="이름"
                            value={orderInfo.deliveryName || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 mb-4 border"
                        />
                        <input
                            type="text"
                            name="deliveryPhone"
                            placeholder="연락처"
                            value={orderInfo.deliveryPhone || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 mb-4 border"
                        />
                        <input
                            type="text"
                            name="address"
                            placeholder="주소"
                            value={orderInfo.address || ''}
                            onChange={handleInputChange}
                            className="w-full p-2 mb-4 border"
                        />
                        <button onClick={closeModal} className="w-full p-2 text-white bg-blue-500 rounded">
                            닫기
                        </button>
                    </div>
                </Modal>
            )}
        </div>
    );
};
