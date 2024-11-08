import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../shared/components/Header';
import InfiniteScroll from '../../features/post/components/InfiniteScroll'; // 무한 스크롤 컴포넌트 임포트
import useTemporaryPosts from '../../features/post/hooks/useTemporaryPosts'; // 임시 게시물 데이터 훅

const GoodsPostPage = () => {
  const goodsPosts = useTemporaryPosts(30); // 30개의 임시 게시물 데이터를 가져옴
  const [hasMore, setHasMore] = React.useState(true); // 더 불러올 게시글이 있는지 여부

  const navigate = useNavigate();

  // PostListPage로 이동하는 함수
  const handlePostListPageNavigation = () => {
    navigate('/postlist'); // PostListPage로 이동
  };

  // 게시글 클릭 시 GoodsPost.tsx로 이동
  const handlePostClick = (postId: number) => {
    navigate(`/goods-post/${postId}`);
  };

  // 게시글 작성 버튼 클릭 시 PostCreate 페이지로 이동
  const handleCreatePostClick = () => {
    navigate('/post/create'); // PostCreate 페이지로 이동
  };

  // 무한스크롤을 위한 함수: 새로운 게시글 추가
  const loadMorePosts = () => {
    if (goodsPosts.length >= 100) {
      setHasMore(false); // 더 이상 불러올 게시글이 없으면 false로 설정
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-white">
      <div className="relative w-[768px] h-[1023px] overflow-y-scroll">
        
        {/* 상단 아이콘들 */}
        <div className="relative">
          <Header />
        </div>
        

        {/* 거래글 작성 버튼 */}
        <div className="absolute top-[147px] left-[627px]">
          <button
            onClick={handleCreatePostClick}
            className="flex items-center justify-center w-[95px] h-[26px] bg-white border border-black rounded font-semibold text-black"
          >
            게시글 작성
          </button>
        </div>

        {/* 게시판 카테고리 */}
        <div className="absolute flex flex-col gap-1 left-[105px] top-[96px] w-[198px] h-[40px]">
          <p className="text-gray-700 font-medium text-center">커뮤니티</p>
        </div>
        <img className="absolute top-[96px] left-[130px] size-6" src="/PostList/icon-lucide-icon2.svg" alt="커뮤니티 아이콘" />

        <div className="absolute flex flex-col gap-1 left-[512px] top-[96px]">
          <p className="text-gray-700 font-medium text-center">아티스트 게시판</p>
        </div>
        <img className="absolute top-[96px] left-[478px] size-6" src="/PostList/icon-favourite0.svg" alt="favourite icon" />

        {/* PostListPage로 돌아가는 버튼 */}
        <div
          className="absolute flex flex-col gap-1 left-[27px] top-[147px] w-[185px] h-[32px] bg-white border rounded cursor-pointer"
          onClick={handlePostListPageNavigation} // 클릭 시 PostListPage로 이동
        >
          <p className="text-gray-700 font-medium text-center">자유 게시판 이동</p>
        </div>

        {/* 검색 입력 필드 */}
        <div className="absolute top-[146px] left-[369px] flex items-center gap-2 p-2 w-[248px] h-[29px] bg-white border border-gray-400 rounded-lg">
          <img className="size-6" src="/PostList/icon-feather-icon12.svg" alt="search icon" />
          <input
            type="text"
            placeholder="Search..."
            className="text-gray-500 bg-transparent border-none focus:outline-none"
          />
        </div>

        {/* 게시글 표시 영역 */}
        <InfiniteScroll loadMore={loadMorePosts} hasMore={hasMore}>
          <div className="grid grid-cols-3 gap-20 absolute top-[188px] left-[76px]">
            {goodsPosts.map((post) => (
              <div
                key={post.id}
                className="size-40 bg-white border rounded cursor-pointer"
                onClick={() => handlePostClick(post.id)} // 게시글 클릭 시 이동
              >
                {post.imageUrl ? (
                  <img className="size-full object-cover" src={post.imageUrl} alt={`Goods post ${post.id}`} />
                ) : (
                   // 이미지 URL이 없을 경우 기본 아이콘만 표시
                  <img className="size-full object-cover" src="/GoodsPostPage/icon-feather-icon3.svg" alt="default icon" />
                )}
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default GoodsPostPage;
