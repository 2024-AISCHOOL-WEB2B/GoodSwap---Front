import { useState, useEffect } from 'react';

// Post 타입 정의 수정
interface Post {
  id: number;
  title: string;
  date: string;
  author: string;
  imageUrl?: string; // 이미지가 없는 경우도 허용
  artistId: number; // artistId 속성 추가
}

const useTemporaryPosts = (length: number) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const generateTemporaryPosts = () => {
      const tempPosts = Array.from({ length }, (_, i) => ({
        id: i + 1,
        title: `게시글 ${i + 1}`,
        date: '2024.10.09. 22:33', // 임시 날짜
        author: `작성자 ${i + 1}`, // 임시 작성자
        imageUrl: i % 2 === 0 ? '/GoodsPostPage/icon-feather-icon3.svg' : '', // 이미지가 없는 경우 아이콘 사용
        artistId: (i % 3) + 1, // artistId는 1, 2, 3 중 하나로 할당
      }));
      setPosts(tempPosts);
    };

    generateTemporaryPosts();
  }, [length]);

  return posts;
};

export default useTemporaryPosts;
