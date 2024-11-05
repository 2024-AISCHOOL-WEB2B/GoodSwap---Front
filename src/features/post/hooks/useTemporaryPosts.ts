import { useState, useEffect } from 'react';

interface Post {
  id: number;
  title: string;
  date: string;
  author: string;
  imageUrl?: string; // 이미지가 없는 경우도 허용

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
        imageUrl: i % 2 === 0 ? '/GoodsPostPage/icon-feather-icon3.svg' : '', // 빈값으로 두고 이미지가 없으면 아이콘을 사용
      }));
      setPosts(tempPosts);
    };

    generateTemporaryPosts();
  }, [length]);

  return posts;
};

export default useTemporaryPosts;
