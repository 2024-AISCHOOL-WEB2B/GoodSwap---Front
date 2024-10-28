import React from 'react';
import { useParams } from 'react-router-dom';

const Post = () => {
  const { postId } = useParams<{ postId: string }>(); // URL에서 postId를 받아옴

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4 bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">게시글 페이지</h1>
      <p className="text-lg">이 페이지는 게시글 ID: {postId} 의 내용을 표시합니다.</p>
      <p className="mt-2 text-gray-600">
        현재 게시글 내용을 표시하는 임시 페이지입니다. 나중에 실제 데이터를 적용할 수 있습니다.
      </p>
    </div>
  );
};

export default Post;
