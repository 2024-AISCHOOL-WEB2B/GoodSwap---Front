import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { Header } from "../../shared/components/Header";
import { PostPagination } from "../../features/post/components/PostPagination";
// import { useTemporaryPosts } from "../../features/post/hooks/useTemporaryPosts";
import { fetchPosts } from "../../features/post/services/postService";
import { ArtistDropdown } from "../../shared/components/ArtistDropdown";
import { selectedArtistAtom } from "../../shared/state/artistState";
import { BackgroundFrame } from "../../shared/components/BackgroundFrame";

interface Post {
  id: number;
  title: string;
  author: string;
  date: string;
  imageUrl?: string;
  artistId: number;
}

const PostListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const navigate = useNavigate();
  const [selectedArtist, setSelectedArtist] = useAtom(selectedArtistAtom);
  const [posts, setPosts] = useState<Post[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  // 임시 데이터 주석 처리
  // const posts = useTemporaryPosts(40);

  // 게시글 데이터를 API에서 가져오기
  const loadPosts = async () => {
    try {
      const data = await fetchPosts(currentPage, postsPerPage);
      setPosts(data);
    } catch (error) {
      console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
    }
  };

  // 페이지 로드 시 게시글 데이터 불러오기
  useEffect(() => {
    loadPosts();
  }, [currentPage]);

  const filteredPosts = selectedArtist
    ? posts.filter((post) => post.artistId === selectedArtist)
    : posts;

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleCreatePostClick = () => {
    navigate("/post/create");
  };

  const handleGoodsPostPageNavigation = () => {
    navigate("/goods-post");
  };

  const handleArtistClick = () => {
    setShowDropdown((prev) => !prev);
  };

  const handleArtistSelect = (artistId: number) => {
    if (artistId === 0) {
      setSelectedArtist(null);
    } else {
      setSelectedArtist(artistId);
    }
    setShowDropdown(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[768px] h-[1006px] bg-white border overflow-visible">
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
          <p className="text-gray-700 font-medium text-center">
            굿즈 판매 게시판 이동
          </p>
        </div>

        {/* 게시글 목록 */}
        <ul className="absolute top-[188px] left-[25px] flex flex-col space-y-2 z-10">
          {filteredPosts.map((post) => (
            <li
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="flex justify-between items-center w-[703px] h-[77px] bg-white border border-black rounded p-2 cursor-pointer hover:bg-gray-50"
            >
              <img
                className="size-20 mr-2"
                src={post.imageUrl || "/PostList/icon-feather-icon3.svg"}
                alt="게시글 아이콘"
              />
              <div className="flex flex-col">
                <div className="text-[#292c33] text-left text-[25px] font-normal">
                  {post.title}
                </div>
                <div className="text-[rgba(41,44,51,0.59)] text-left text-xl font-normal">
                  {post.date} &nbsp;|&nbsp; {post.author}
                </div>
              </div>
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

export { PostListPage };
