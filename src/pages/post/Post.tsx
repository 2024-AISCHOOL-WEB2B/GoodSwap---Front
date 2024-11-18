import React, { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { Header } from "../../shared/components/Header";
import { BackgroundFrame } from "../../shared/components/BackgroundFrame";
import { fetchPostById } from "../../features/post/services/postService";

interface PostData {
  title: string;
  author: string;
  content: string;
  createdAt: string;
  views: number;
}

interface CommentData {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

const Post = () => {
  const { postId } = useParams<{ postId: string }>();
  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<CommentData[]>([]);

  // 게시글 데이터를 가져오는 함수
  const fetchPostData = useCallback(async () => {
    try {
      const data = await fetchPostById(Number(postId));
      setPost(data);
    } catch (error) {
      console.error("게시글 데이터를 가져오는 중 오류 발생:", error);
      // 오류 발생 시 임시 데이터 사용
      setPost({
        title: "테스트 제목",
        author: "회원1",
        content: "이것은 임시 내용입니다.",
        createdAt: "2024.10.09. 22:33",
        views: 7,
      });
    }
  }, [postId]);

  // 임시 댓글 데이터 설정
  const fetchComments = () => {
    const tempComments = [
      { id: 1, author: "회원1", content: "이것은 첫 번째 댓글입니다.", createdAt: "2024.10.09. 22:34" },
      { id: 2, author: "회원2", content: "두 번째 댓글입니다.", createdAt: "2024.10.09. 22:35" },
      { id: 3, author: "회원3", content: "세 번째 댓글입니다.", createdAt: "2024.10.09. 22:36" },
    ];
    setComments(tempComments);
  };

  // 페이지 로드 시 게시글과 댓글 데이터를 가져옴
  useEffect(() => {
    if (postId) {
      fetchPostData();
      fetchComments();
    }
  }, [postId, fetchPostData]);

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="relative w-[768px] h-[1006px] bg-white border overflow-hidden">
        <BackgroundFrame />
        <div className="relative">
          <Header />
        </div>

        {/* 게시글 제목 */}
        <div className="text-[#292c33] text-left text-[50px] font-normal absolute left-[31px] top-[110px] w-[573px] h-[63px] flex items-center justify-start">
          {post.title}
        </div>

        {/* 작성자 정보 */}
        <img
          className="size-20 absolute left-[49px] top-[181px] overflow-visible"
          src="/Post/group-368300.svg"
          alt="user icon"
        />
        <div className="text-[#292c33] text-center text-[25px] font-normal absolute left-[115px] top-[179px] w-[122px] h-[55px] flex items-center justify-center">
          {post.author}
        </div>

        {/* 작성일과 조회수 */}
        <div className="text-[rgba(41,44,51,0.59)] text-center text-xl font-normal absolute left-[89px] top-[223px] w-[346px] h-[34px] flex items-center justify-center">
          {post.createdAt} 조회 {post.views}
        </div>

        {/* 상단 구분선 */}
        <div className="border-t border-[rgba(0,0,0,0.46)] w-[711px] absolute left-[31px] top-[273px]"></div>

        {/* 내용 */}
        <div className="text-[#000000] text-left text-[55px] font-semibold absolute left-[calc(50%_-_345px)] top-[calc(50%_-_215.5px)] w-[678px] h-[388px]">
          {post.content}
        </div>

        {/* 댓글 */}
        <div className="border-t border-[rgba(0,0,0,0.46)] w-[711px] absolute left-[31px] top-[770px]"></div>
        {comments.map((comment) => (
          <div key={comment.id} className="text-[#292c33] text-xl flex flex-col items-start ml-12 mt-4">
            <div className="font-semibold">{comment.author}</div>
            <div>{comment.content}</div>
            <div className="text-[rgba(41,44,51,0.59)] text-sm">{comment.createdAt}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export { Post };
