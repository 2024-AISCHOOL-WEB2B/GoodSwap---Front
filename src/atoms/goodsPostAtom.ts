//굿즈 가격, 이름, 아티스트, 카테고리 입력 필드의 데이터를 goodsPostAtom에 저장하고, GoodsPostPage에서 표시되도록 구현할 예정
// src/atoms/goodsPostAtom.ts
import { atom } from 'jotai';

export const goodsPostAtom = atom({
  id: 0,
  author: '',
  artist: '',
  category: '',
  goodsName: '',
  title: '',
  price: '',
  imageUrl: '/GoodsPostPage/icon-feather-icon3.svg',
});
