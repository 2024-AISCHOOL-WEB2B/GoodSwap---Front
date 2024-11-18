import { atom } from 'jotai';

// 주문 정보(상태) 관리하는 atom 생성
// src/features/payment/atoms/orderAtom.ts

export const orderInfoAtom = atom({
    // 배송 정보
    user: 'user', //회원
    receiverName: '', // 받는 사람 이름
    receiverPhone: '', // 받는 사람 전화번호
    deliveryAddr: '', // 기본 주소
    postCode: '', // 우편번호
    deliveryDetailAddr: '', // 상세 배송지
    request: '', // 요청 사항

    // 결제 정보
    payMethod: 'card', // 결제 방법
    merchantUid: 'r', // 주문 번호(고유)
    discountAmount: 0, // 사용할 포인트
    totalAmount: 0, // 총 결제 금액 (주문에 따라 계산됨)

    // 상품 정보
    selectedProduct: {
        goods_name: '뭘까', // 상품명
        goods: 3, //상품번호
        price: 1000, // 상품 가격
        quantity: 11, // 수량
        discountAmount: 10, // 포인트
        orderStatus: '결제 준비', // 결제 상태
    },
});
