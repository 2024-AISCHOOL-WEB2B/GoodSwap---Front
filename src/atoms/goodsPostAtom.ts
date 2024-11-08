// src/atoms/goodsPostAtom.ts
import { atom } from 'jotai';

export const goodsPostAtom = atom({
  id: 0,
  artist: '',
  category: '',
  goodsName: '',
  title: '',
  price: '',
  imageUrl: '/GoodsPostPage/icon-feather-icon3.svg',
});
