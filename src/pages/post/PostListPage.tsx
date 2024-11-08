import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import Header from '../../shared/components/Header';
import BackgroundImage from '../../shared/components/BackgroundImage';
import PostPagination from '../../features/post/components/PostPagination';
import useTemporaryPosts from '../../features/post/hooks/useTemporaryPosts';
import ArtistDropdown from '../../shared/components/ArtistDropdown';
import { selectedArtistAtom } from '../../shared/state/artistState';

const PostListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const navigate = useNavigate();
  const [selectedArtist, setSelectedArtist] = useAtom(selectedArtistAtom);
  const [showDropdown, setShowDropdown] = useState(false); // 드롭다운 표시 여부 상태

  const posts = useTemporaryPosts(23);
  const filteredPosts = selectedArtist ? posts.filter((post) => post.artistId === selectedArtist) : posts;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleCreatePostClick = () => {
    navigate('/post/create');
  };

  const handleGoodsPostPageNavigation = () => {
    navigate('/goods-post');
  };

  const handleArtistClick = () => {
    setShowDropdown((prev) => !prev); // 드롭다운 표시 상태 토글
  };

  const handleArtistSelect = (artistId: number) => {
    setSelectedArtist(artistId);
    setShowDropdown(false); // 아티스트 선택 후 드롭다운 닫기
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[768px] h-[1006px] bg-white border overflow-visible">
        <BackgroundImage src="/PostList/rectangle-970.svg" alt="rectangle" />
        <Header />


        {/* 커뮤니티 카테고리 */}
        <div className="absolute flex flex-col gap-1 left-[120px] top-[96px] w-[198px] h-[40px] z-40">
          <p className="text-gray-700 font-medium text-center">커뮤니티</p>
        </div>
        <img
          className="absolute top-[96px] left-[150px] w-6 h-6 z-40"
          src="/PostList/icon-lucide-icon2.svg"
          alt="커뮤니티 아이콘"
        />


        {/* 아티스트 게시판 */}
        <div
          className="absolute flex flex-col gap-1 left-[455px] top-[96px] w-[198px] h-[40px] cursor-pointer z-40"
          onClick={handleArtistClick}
        >
          <p className="text-gray-700 font-medium text-center">아티스트</p>
        </div>
        <img
          className="absolute top-[96px] left-[490px] w-6 h-6 z-40"
          src="/PostList/icon-favourite0.svg"
          alt="아티스트 게시판 아이콘"
        />


        {/* 아티스트 드롭다운 */}
        {showDropdown && (
            <div className="absolute left-[520px] top-[136px] z-50">
                <ArtistDropdown onSelect={handleArtistSelect} />
            </div>
        )}

        
        {/* 게시글 작성 버튼 */}
        <div className="absolute top-[147px] left-[627px] z-40">
          <button
            onClick={handleCreatePostClick}
            className="flex items-center justify-center w-[95px] h-[26px] bg-white border border-black rounded font-semibold text-black"
          >
            게시글 작성
          </button>
        </div>

        {/* 굿즈 게시판으로 이동 버튼 */}
        <div
          className="absolute flex flex-col gap-1 left-[27px] top-[147px] w-[185px] h-[32px] bg-white border rounded cursor-pointer z-40"
          onClick={handleGoodsPostPageNavigation}
        >
          <p className="text-gray-700 font-medium text-center">굿즈 판매 게시판 이동</p>
        </div>


        {/* 검색 입력 필드 */}
        <div className="absolute top-[146px] left-[369px] flex items-center gap-2 p-2 w-[248px] h-[29px] bg-white border border-gray-400 rounded-lg z-40">
          <img className="w-6 h-6" src="/PostList/icon-feather-icon12.svg" alt="search icon" />
          <input
            type="text"
            placeholder="Search..."
            className="text-gray-500 bg-transparent border-none focus:outline-none"
          />
        </div>

        {/* 게시글 목록 */}
        <ul className="absolute top-[188px] left-[25px] flex flex-col space-y-2 z-10">
          {currentPosts.map((post) => (
            <li
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="flex justify-between items-center w-[703px] h-[77px] bg-white border border-black rounded p-2 cursor-pointer hover:bg-gray-50"
            >
              <img
                className="size-20 mr-2"
                src={post.imageUrl ? post.imageUrl : '/PostList/icon-feather-icon3.svg'}
                alt="게시글 아이콘"
              />
              <div className="flex flex-col">
                <div className="text-[#292c33] text-left text-[25px] font-normal">{post.title}</div>
                <div className="text-[rgba(41,44,51,0.59)] text-left text-xl font-normal">
                  {post.date} &nbsp;|&nbsp; {post.author}
                </div>
              </div>
              <img className="w-6 h-5 ml-auto mr-2" src="/PostList/vector0.svg" alt="좋아요" />
            </li>
          ))}
        </ul>

        {/* 페이지 네이션 */}
        <div className="absolute w-full bottom-10 flex justify-center z-10">
          <PostPagination
            totalPosts={filteredPosts.length}
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
