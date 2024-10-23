import React, { useState } from 'react';
import { useAtom } from 'jotai';
import { orderInfoAtom } from '../atoms/orderAtom';

const PaymentForm = () => {
    const [orderInfo, setOrderInfo] = useAtom(orderInfoAtom);
    const [coupon, setCoupon] = useState('');
    const [points, setPoints] = useState(0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOrderInfo({
            ...orderInfo,
            [e.target.name]: e.target.value,
        });
    };

    const handleCouponApply = () => {
        setOrderInfo({ ...orderInfo, totalAmount: orderInfo.totalAmount - 1000 });
    };

    const handlePointsApply = () => {
        setOrderInfo({ ...orderInfo, totalAmount: orderInfo.totalAmount - points });
    };

    return (
        <div className="max-w-2xl p-6 mx-auto bg-gray-100">
            <h1 className="mb-4 text-xl font-bold">결제하기</h1>

            {/* 주문자 정보 */}
            <div className="mb-4">
                <h2 className="font-semibold">주문자 정보</h2>
                <input
                    type="text"
                    name="customerName"
                    placeholder="박지광"
                    value={orderInfo.customerName}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border"
                />
                <input
                    type="text"
                    name="phoneNumber"
                    placeholder="01012345678"
                    value={orderInfo.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border "
                />
                <input
                    type="email"
                    name="email"
                    placeholder="user@imweb.me"
                    value={orderInfo.email}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border"
                />
            </div>

            {/* 배송지 정보 */}
            <div className="mb-4">
                <h2 className="font-semibold">배송지 정보</h2>
                <input
                    type="text"
                    name="deliveryName"
                    placeholder="박지광"
                    value={orderInfo.deliveryName}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border"
                />
                <input
                    type="text"
                    name="deliveryPhone"
                    placeholder="01012345678"
                    value={orderInfo.deliveryPhone}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border"
                />
                <input
                    type="text"
                    name="address"
                    placeholder="광주강역시"
                    value={orderInfo.address}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border"
                />
                <input
                    type="text"
                    name="additionalInfo"
                    placeholder="추가 요청사항"
                    value={orderInfo.additionalInfo}
                    onChange={handleInputChange}
                    className="w-full p-2 mt-2 border"
                />
            </div>

            {/* 쿠폰/포인트 */}
            <div className="mb-4">
                <h2 className="font-semibold">쿠폰/포인트</h2>
                <input
                    type="text"
                    placeholder="쿠폰 코드"
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    className="w-full p-2 mt-2 border"
                />
                <button onClick={handleCouponApply} className="p-2 mt-2 text-white bg-blue-500">
                    쿠폰적용
                </button>

                <input
                    type="number"
                    placeholder="포인트 사용"
                    value={points}
                    onChange={(e) => setPoints(Number(e.target.value))}
                    className="w-full p-2 mt-2 border"
                />
                <button onClick={handlePointsApply} className="p-2 mt-2 text-white bg-blue-500">
                    포인트 적용
                </button>
            </div>

            {/* 결제수단 */}
            <div className="mb-4">
                <h2 className="font-semibold">결제수단</h2>
                <select className="w-full p-2 mt-2 border">
                    <option value="bankTransfer">무통장입금</option>
                </select>
            </div>

            {/* 총 결제 금액 */}
            <div className="font-semibold text-right">총 결제 금액: {orderInfo.totalAmount.toLocaleString()}원</div>

            <button className="w-full p-4 mt-4 font-bold text-white bg-blue-500">결제하기</button>
        </div>
    );
};

export default PaymentForm;
