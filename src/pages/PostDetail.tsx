// src/pages/PostDetail.tsx
import React from 'react';
import { useParams } from 'react-router-dom';

const PostDetail: React.FC = () => {
  const { postId } = useParams(); // URL 파라미터에서 postId를 가져옴

  return (
    <div style={{ padding: '20px' }}>
      <h1>Post Detail for Post {postId}</h1>
      <p>여기에 게시물 {postId}의 상세 정보를 추가하세요.</p>
    </div>
  );
};

export default PostDetail;
