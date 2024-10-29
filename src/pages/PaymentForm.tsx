// src/pages/PaymentForm.tsx
import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { orderInfoAtom } from '../atoms/orderAtom';
import Modal from '../features/auth/Modal'; // Modal 컴포넌트 import 경로 확인

const PaymentForm = () => {
    const [orderInfo, setOrderInfo] = useAtom(orderInfoAtom);
    const [coupon, setCoupon] = useState('');
    const [points, setPoints] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false); // 모달 상태

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

    // 모달 열기
    const openModal = () => {
        setIsModalOpen(true);
    };

    // 모달 닫기
    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex max-w-4xl p-6 mx-auto bg-gray-100">
            {/* 좌측 영역 */}
            <div className="w-2/3 pr-8">
                {/* 주문자 정보 */}
                <div className="p-4 mb-6 bg-white border">
                    <h2 className="font-semibold">주문자 정보</h2>
                    <div className="flex justify-end">
                        <button className="px-3 py-2 text-white bg-blue-500 rounded">수정</button>
                    </div>
                    <div className="p-4 mb-6 bg-white border">
                        <div>
                            {orderInfo.customerName} <br />
                            {orderInfo.phoneNumber} <br />
                            {orderInfo.email}
                        </div>
                    </div>
                </div>

                {/* 배송지 정보 */}
                <div className="p-4 mt-4 mb-6 bg-white border">
                    <h2 className="font-semibold">배송 정보</h2>
                    <div className="flex justify-end">
                        <button onClick={openModal} className="px-3 py-2 text-white bg-blue-500 rounded">
                            변경
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
                    <div className="mt-2">보유 포인트: 2,300</div>
                </div>
            </div>

            {/* 우측 영역 (고정) */}
            <div className="sticky top-0 w-1/3 h-full p-4 bg-white border">
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
                            <span>{(orderInfo.totalAmount - points - 0 + 0).toLocaleString()}원</span>
                        </div>
                    </div>
                </div>

                {/* 결제수단 */}
                <div className="mb-6">
                    <h2 className="font-semibold">결제 방법</h2>
                    <div>
                        <label className="block">
                            <input type="radio" name="paymentMethod" value="creditCard" className="mr-2" />
                            신용카드
                        </label>
                        <label className="block">
                            <input type="radio" name="paymentMethod" value="virtualAccount" className="mr-2" />
                            가상계좌
                        </label>
                        <label className="block">
                            <input type="radio" name="paymentMethod" value="bankTransfer" className="mr-2" />
                            무통장 입금
                        </label>
                        <label className="block">
                            <input type="radio" name="paymentMethod" value="mobilePayment" className="mr-2" />
                            핸드폰 결제
                        </label>
                    </div>
                </div>

                {/* 결제하기 버튼 */}
                <button className="w-full p-4 font-bold text-white bg-blue-500">결제하기</button>
            </div>

            {/* 모달 컴포넌트 */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {' '}
                {/* isOpen 추가 */}
                <div className="p-4 bg-white">
                    <h2 className="mb-4 text-lg font-semibold">배송 정보 변경</h2>
                    <p>여기에 배송 정보 변경 폼을 추가하세요.</p>
                    <button onClick={closeModal} className="px-4 py-2 mt-4 text-white bg-red-500 rounded">
                        닫기
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default PaymentForm;
