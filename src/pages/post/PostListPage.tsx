import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostPagination from '../../features/post/components/PostPagination';
import useTemporaryPosts from '../../features/post/hooks/useTemporaryPosts'; // 임시 데이터 훅 임포트


const PostListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const navigate = useNavigate();

  // 23개의 임시 게시글 데이터 생성
  const posts = useTemporaryPosts(23);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleCreatePostClick = () => {
    navigate('/post/create'); // 올바른 URL로 수정
  };

  const handleGoodsPostPageNavigation = () => {
    navigate('/goods-post'); // GoodsPostPage로 이동
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[768px] h-[1006px] bg-white border">
        <img className="absolute top-0 left-0 size-full" src="/PostList/rectangle-970.svg" alt="rectangle" />


        {/* 상단 아이콘들 */}
        <div className="absolute flex flex-col gap-2 px-6 py-4 bg-white w-full top-0 left-0">
          <h2 className="text-2xl font-semibold text-left">Goodswap</h2>
          <div className="absolute flex items-center justify-start gap-2 top-7 right-6">
            <img className="size-6" src="/PostList/icon-feather-icon0.svg" alt="icon" />
            <img className="size-6" src="/PostList/icon-feather-icon1.svg" alt="icon" />
            <img className="size-6" src="/PostList/icon-lucide-icon0.svg" alt="icon" />
          </div>
        </div>


        {/* 게시글 목록 */}
        <ul className="absolute top-[188px] left-[25px] flex flex-col space-y-2">
          {currentPosts.map((post) => (
            <li
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="flex justify-between items-center w-[703px] h-[77px] bg-white border border-black rounded p-2 cursor-pointer hover:bg-gray-50"
            >

              {/* 게시글 아이콘 */}
              <img
                className="size-14 mr-2"
                src={
                      post.imageUrl
                      ? post.imageUrl // 게시글에 이미지가 있으면 해당 이미지를 사용
                      : '/PostList/icon-feather-icon3.svg' // 없으면 기본 아이콘을 사용
                    }
                alt="게시글 아이콘"
              />

              {/* 게시글 제목 및 정보 */}
              <div className="flex flex-col">
                <div className="text-[#292c33] text-left text-[25px] font-normal">{post.title}</div>
                <div className="text-[rgba(41,44,51,0.59)] text-left text-xl font-normal">{post.date} &nbsp;|&nbsp; {post.author}</div>
              </div>

              {/* 게시글 아이콘 */}
              <img className="w-6 h-5  ml-auto mr-2" src="/PostList/vector0.svg" alt="좋아요" />

            </li>
          ))}
        </ul>


        {/* 게시글 작성 버튼 */}
        <div className="absolute top-[147px] left-[627px]">
          <button
            onClick={handleCreatePostClick}
            className="flex items-center justify-center w-[95px] h-[26px] bg-white border border-black rounded font-semibold text-black"
            >게시글 작성
          </button>
        </div>
        


        {/* 검색 입력 필드 */}
        <div className="absolute top-[146px] left-[369px] flex items-center gap-2 p-2 w-[248px] h-[29px] bg-white border border-gray-400 rounded-lg">
          <img className="sizw-6" src="/PostList/icon-feather-icon12.svg" alt="search icon" />
          <input
          type="text"
          placeholder="Search..."
          className="text-gray-500 bg-transparent border-none focus:outline-none"
          />
        </div>


        {/* 게시판 카테고리 */}
        <div className="absolute flex flex-col gap-1 left-[105px] top-[96px] w-[198px] h-[40px]">
          <p className="text-gray-700 font-medium text-center">커뮤니티</p>
        </div>
        <img className="absolute top-[96px] left-[130px] sizw-6" src="/PostList/icon-lucide-icon2.svg" alt="커뮤니티 아이콘" />


        <div className="absolute flex flex-col gap-1 left-[512px] top-[96px]">
          <p className="text-gray-700 font-medium text-center">아티스트 게시판</p>
        </div>
        <img className="absolute top-[96px] left-[calc(50%--100px)] sizw-6" src="/PostList/icon-favourite0.svg" alt="favourite icon" />


        {/* 클릭시 GoodsPost 페이지로 이동 */}
        <div className="absolute flex flex-col gap-1 left-[27px] top-[147px] w-[185px] h-[32px] bg-white border rounded"
        onClick={handleGoodsPostPageNavigation}
        >
          <p className="text-gray-700 font-medium text-center">굿즈 판매 게시판 이동</p>
        </div>


        {/*페이지 네이션 */}
        <div className="absolute w-full bottom-10 flex justify-center">
          <PostPagination
            totalPosts={posts.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>




    </div>
  );
};

export default PostListPage;
