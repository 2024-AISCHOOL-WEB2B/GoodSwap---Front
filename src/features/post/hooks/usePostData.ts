import { useState, useEffect } from 'react';

// 게시글 데이터의 타입 정의
interface Post {
  id: number;
  title: string;
  imageUrl?: string; // 이미지가 없는 경우를 대비해 선택적 속성으로 정의
  date: string;
  author: string;
}

interface UsePostDataOptions {
  mode: 'pagination' | 'infinite-scroll';
  page?: number;       // 페이지네이션 모드에서 사용할 페이지 번호
  limit?: number;      // 한번에 가져올 게시글 수
}

const usePostData = ({ mode, page = 1, limit = 8 }: UsePostDataOptions) => {
  const [posts, setPosts] = useState<Post[]>([]); // Post 타입으로 지정
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 게시글 데이터를 받아오는 로직
        let url = `/api/posts?_limit=${limit}`;

        if (mode === 'infinite-scroll') {
          // 무한스크롤에서는 게시글의 개수에 따라 시작점을 설정
          url += `&_start=${posts.length}`;
        } else if (mode === 'pagination') {
          // 페이지네이션 모드일 경우 페이지 번호를 추가
          url += `&_page=${page}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error('데이터를 가져오는 중 오류가 발생했습니다.');
        const data: Post[] = await response.json(); // Post 타입으로 데이터 정의

        // 무한스크롤일 경우 기존 게시글에 더 추가
        if (mode === 'infinite-scroll') {
          setPosts((prevPosts) => [
            ...prevPosts,
            ...data.map((post) => ({
              ...post,
              imageUrl: post.imageUrl || '/GoodsPostPage/icon-feather-icon3.svg', // 이미지가 없을 경우 기본 이미지 설정
            })),
          ]);
          if (data.length < limit) {
            setHasMore(false); // 더 이상 게시글이 없으면 hasMore를 false로
          }
        } else {
          // 페이지네이션 모드일 경우 새 게시글로 대체
          setPosts(
            data.map((post) => ({
              ...post,
              imageUrl: post.imageUrl || '/GoodsPostPage/icon-feather-icon3.svg', // 이미지가 없을 경우 기본 이미지 설정
            }))
          );
        }
      } catch (error) {
        console.error('게시글을 불러오는 중 오류가 발생했습니다:', error);
      }
    };

    fetchPosts();
  }, [mode, page, limit, posts.length]); // posts.length를 의존성 배열에 추가

  return { posts, hasMore };
};

export default usePostData;
