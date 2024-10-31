import { atom } from 'jotai';

// 주문 정보(상태) 관리하는 atom 생성
export const orderInfoAtom = atom({
    deliveryName: '', // 배송 받을 사람
    deliveryPhone: '', //전화번호
    address: '', // 주소지

    additionalInfo: '10', // 배송 시 추가 요청 사항 (예: "문 앞에 놔주세요")
    coupon: '', // 적용된 쿠폰 코드 (적용된 쿠폰이 없으면 빈 문자열)
    points: 30, // 사용할 포인트 (기본값은 0)
    totalAmount: 0, // 총 결제 금액 (초기값은 0, 이후 주문에 따라 계산됨)

    deliveryMemo: '', // 배송 메모 (고객이 입력할 수 있는 배송 관련 메모)
});
