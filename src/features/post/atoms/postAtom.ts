// src/atoms/postAtom.ts
import { atom } from 'jotai';

export const postAtom = atom({
  id: 0,
  author: '',
  category: '',
  title: '',
  content: '',
  date: '',
  imageUrl: '/PostList/default-icon.svg',
});
