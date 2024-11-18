// src/features/payment/components/apiTypes.ts

// 요청 데이터 타입
export interface PaymentRequestData {
    discountAmount: string;
    deliveryAddr: string;
    detailAddress: string;
    deliveryName: string;
    receiverPhone: number;
    payMethod: 'CARD' | 'TRANS' | 'VBANK' | 'PHONE'; // 결제 수단
}

// 응답 데이터 타입
export interface PaymentResponse {
    success: boolean;
    message: string;
    orderId?: number;
}
