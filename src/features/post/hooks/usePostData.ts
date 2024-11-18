import { useState, useEffect } from "react";

// 게시글 데이터의 타입 정의
interface Post {
  id: number;
  title: string;
  imageUrl?: string;
  date: string;
  author: string;
}

interface UsePostDataOptions {
  mode: "pagination" | "infinite-scroll";
  page?: number;
  limit?: number;
}

const usePostData = ({ mode, page = 1, limit = 8 }: UsePostDataOptions) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        let url = `http://localhost:8080/api/posts?limit=${limit}`;

        if (mode === "infinite-scroll") {
          url += `&offset=${posts.length}`;
        } else if (mode === "pagination") {
          url += `&page=${page}`;
        }

        const response = await fetch(url, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`서버 오류: ${response.statusText}`);
        }

        const data: Post[] = await response.json();

        if (mode === "infinite-scroll") {
          setPosts((prevPosts) => [
            ...prevPosts,
            ...data.map((post) => ({
              ...post,
              imageUrl:
                post.imageUrl || "/GoodsPostPage/icon-feather-icon3.svg",
            })),
          ]);
          if (data.length < limit) {
            setHasMore(false);
          }
        } else {
          setPosts(
            data.map((post) => ({
              ...post,
              imageUrl:
                post.imageUrl || "/GoodsPostPage/icon-feather-icon3.svg",
            }))
          );
        }
      } catch (error) {
        // 수정된 부분
        if (error instanceof Error) {
          console.error("게시글을 불러오는 중 오류가 발생했습니다:", error.message);
        } else {
          console.error("알 수 없는 오류가 발생했습니다.");
        }
      }
    };

    fetchPosts();
  }, [mode, page, limit, posts.length]);

  return { posts, hasMore };
};

export { usePostData };
