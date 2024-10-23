import { atom } from 'jotai';

export const orderInfoAtom = atom({
    customerName: '',
    phoneNumber: '',
    email: '',
    deliveryName: '',
    deliveryPhone: '',
    address: '',
    additionalInfo: '',
    coupon: '',
    points: 0,
    totalAmount: 0,
});
