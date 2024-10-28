// src/features/post/hooks/usePostData.ts
import { useState, useEffect } from 'react';

const usePostData = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // 게시글 데이터를 받아오는 로직
    const fetchPosts = async () => {
      const response = await fetch('/api/posts');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  return posts;
};

export default usePostData;
