// PostList Component for displaying user posts in a detailed table layout
import React from "react";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  views: number;
}

const posts: Post[] = [
  {
    id: 1,
    title: "블랙핑크 제니 New york 콘서트 개최!",
    author: "운영자",
    date: "00:00",
    views: 138988,
  },
  {
    id: 2,
    title: "뉴진스 팬싸인회 일정",
    author: "운영자",
    date: "14:00",
    views: 650,
  },
  {
    id: 3,
    title: "블랙핑크 사랑해요~",
    author: "blackS2jen",
    date: "14:05",
    views: 7,
  },
  {
    id: 4,
    title: "bts 복귀 언제해요",
    author: "army2032",
    date: "14:01",
    views: 19,
  },
  {
    id: 5,
    title: "넥스트도어 너무좋음~",
    author: "두둠칫",
    date: "13:58",
    views: 31,
  },
  {
    id: 6,
    title: "mama 행사일정 공유해요~",
    author: "mama",
    date: "13:56",
    views: 21,
  },
];

export const PostList: React.FC = () => {
  const navigate = useNavigate();

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`); // 특정 포스트 클릭 시 해당 포스트의 상세 페이지로 이동
  };

  const test = () => {
    navigate(`/postlist`); // 전체 상품 보기 페이지로 이동
  };


  return (
    <div style={{ margin: "20px auto", width: "90%" }}>
      <h2
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "20px",
          color: "#ff69b4",
          cursor: 'pointer'
        }} onClick={test}
      >
        Post
      </h2>
      <table
        style={{ width: "100%", borderCollapse: "collapse", textAlign: "left" }}
      >
        <thead>
          <tr style={{ borderBottom: "2px solid #ff69b4" }}>
            <th style={{ padding: "10px" }}>번호</th>
            <th style={{ padding: "10px" }}>제목</th>
            <th style={{ padding: "10px" }}>글쓴이</th>
            <th style={{ padding: "10px" }}>작성일</th>
            <th style={{ padding: "10px" }}>조회</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              style={{ cursor: "pointer", borderBottom: "1px solid #ccc" }}
            >
              <td style={{ padding: "10px", width: "10%" }}>{post.id}</td>
              <td style={{ padding: "10px", width: "50%" }}>{post.title}</td>
              <td style={{ padding: "10px", width: "15%" }}>{post.author}</td>
              <td style={{ padding: "10px", width: "15%" }}>{post.date}</td>
              <td style={{ padding: "10px", width: "10%" }}>{post.views}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PostList;
