import { atom } from 'jotai';

// 주문 정보(상태) 관리하는 atom 생성
export const orderInfoAtom = atom({
    customerName: '박지광', // 주문자의 이름
    phoneNumber: '01029955639', // 주문자의 휴대폰 번호
    email: 'wl5639@naver.com', // 주문자의 이메일

    deliveryName: '방찬혁', // 배송받을 사람의 이름 (배송 정보에 사용)
    deliveryPhone: '01029955639', // 배송받을 사람의 휴대폰 번호 (배송 정보)
    address: '광주광역시 남구 문흥동', // 배송받을 주소지

    additionalInfo: '10', // 배송 시 추가 요청 사항 (예: "문 앞에 놔주세요" 등)
    coupon: '', // 적용된 쿠폰 코드 (적용된 쿠폰이 없으면 빈 문자열)
    points: 30, // 사용할 포인트 (기본값은 0)
    totalAmount: 20000, // 총 결제 금액 (초기값은 0, 이후 주문에 따라 계산됨)

    deliveryMemo: '', // 배송 메모 (고객이 입력할 수 있는 배송 관련 메모)
});
