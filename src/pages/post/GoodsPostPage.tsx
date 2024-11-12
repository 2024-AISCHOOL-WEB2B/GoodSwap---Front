import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import Header from '../../shared/components/Header';
import InfiniteScroll from '../../features/post/components/InfiniteScroll';
import useTemporaryPosts from '../../features/post/hooks/useTemporaryPosts';
import ArtistDropdown from '../../shared/components/ArtistDropdown';
import { selectedArtistAtom } from '../../shared/state/artistState';
import BackgroundFrame from '../../shared/components/BackgroundFrame';


const GoodsPostPage = () => {
  const goodsPosts = useTemporaryPosts(30);
  const [hasMore, setHasMore] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedArtist, setSelectedArtist] = useAtom(selectedArtistAtom);
  const navigate = useNavigate();

  const filteredPosts = selectedArtist
    ? goodsPosts.filter((post) => post.artistId === selectedArtist)
    : goodsPosts;

  const loadMorePosts = () => {
    if (goodsPosts.length >= 100) {
      setHasMore(false);
    }
  };

  const handleArtistClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleArtistSelect = (artistId: number) => {
    if (artistId === 0) {
        setSelectedArtist(null); // 전체 게시판으로 돌아가기
    } else {
        setSelectedArtist(artistId);
    }
    setShowDropdown(false);
  };

  const handlePostListPageNavigation = () => {
    navigate('/postlist');
  };

  const handleCreateGoodsPostClick = () => {
    navigate('/goods-post-create');
  };

  const handlePostClick = (postId: number) => {
    navigate(`/goods-post/${postId}`);
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
      <div id="scrollableDiv" className="relative w-[768px] h-[1023px] bg-white overflow-y-scroll">
        <BackgroundFrame />
        <Header />

        {/* 아티스트 게시판 */}
        <div
          className="absolute flex flex-col gap-1 left-[120px] top-[96px] w-[198px] h-[40px] cursor-pointer z-40"
          onClick={handleArtistClick}
        >
          <p className="text-gray-700 font-medium text-center">아티스트</p>
        </div>
        <img
          className="absolute top-[96px] left-[150px] size-6 z-40"
          src="/PostList/icon-favourite0.svg"
          alt="아티스트 게시판 아이콘"
        />

        {/* 커뮤니티 카테고리 */}
        <div className="absolute flex flex-col gap-1 left-[455px] top-[96px] w-[198px] h-[40px] z-40">
          <p className="text-gray-700 font-medium text-center">커뮤니티</p>
        </div>
        <img
          className="absolute top-[96px] left-[490px] size-6 z-40"
          src="/PostList/icon-lucide-icon2.svg"
          alt="커뮤니티 아이콘"
        />

        {/* 아티스트 드롭다운 */}
        {showDropdown && (
          <div className="absolute left-[145px] top-[136px] z-50">
            <ArtistDropdown onSelect={handleArtistSelect} />
          </div>
        )}

        {/* 게시글 작성 버튼 */}
        <div className="absolute top-[147px] left-[627px] z-40">
          <button
            onClick={handleCreateGoodsPostClick}
            className="flex items-center justify-center w-[95px] h-[26px] bg-white border border-black rounded font-semibold text-black"
          >
            게시글 작성
          </button>
        </div>

        {/* PostListPage로 돌아가는 버튼 */}
        <div
          className="absolute flex flex-col gap-1 left-[27px] top-[147px] w-[185px] h-[32px] bg-white border rounded cursor-pointer z-40"
          onClick={handlePostListPageNavigation}
        >
          <p className="text-gray-700 font-medium text-center">자유 게시판 이동</p>
        </div>

        {/* 검색 입력 필드 */}
        <div className="absolute top-[146px] left-[369px] flex items-center gap-2 p-2 w-[248px] h-[29px] bg-white border border-gray-400 rounded-lg z-40">
          <img className="size-6" src="/PostList/icon-feather-icon12.svg" alt="search icon" />
          <input
            type="text"
            placeholder="Search..."
            className="text-gray-500 bg-transparent border-none focus:outline-none"
          />
        </div>

        {/* 게시글 표시 영역 */}
        <InfiniteScroll loadMore={loadMorePosts} hasMore={hasMore} scrollableTarget="scrollableDiv">
          <div className="grid grid-cols-3 gap-20 absolute top-[188px] left-[76px]">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="size-40 bg-white border rounded cursor-pointer"
                onClick={() => handlePostClick(post.id)}
              >
                {post.imageUrl ? (
                  <img className="size-full object-cover" src={post.imageUrl} alt={`Goods post ${post.id}`} />
                ) : (
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
