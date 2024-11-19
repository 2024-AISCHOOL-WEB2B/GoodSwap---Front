import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAtom } from "jotai";
import { Header } from "../../shared/components/Header";
import { InfiniteScroll } from "../../features/post/components/InfiniteScroll";
import { ArtistDropdown } from "../../shared/components/ArtistDropdown";
import { selectedArtistAtom } from "../../shared/state/artistState";
import { BackgroundFrame } from "../../shared/components/BackgroundFrame";
import { fetchGoodsPosts } from "../../features/post/services/goodsPostService";

interface GoodsPostData {
  id: number;
  artistId: number;
  artist: string;
  title: string;
  content: string;
  imageUrl: string;
  goodsName: string;
  price: number;
  quantity: number;
  createdAt: string;
}

const GoodsPostPage = () => {
  const [goodsPosts, setGoodsPosts] = useState<GoodsPostData[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedArtist, setSelectedArtist] = useAtom(selectedArtistAtom);
  const navigate = useNavigate();

  // 게시글 불러오기 함수
  const loadGoodsPosts = useCallback(async () => {
    try {
      const limit = 30;
      const data = await fetchGoodsPosts(page, limit);
      setGoodsPosts((prevPosts) => [...prevPosts, ...data]);

      if (data.length < limit) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("게시글 데이터를 불러오는 중 오류 발생:", error);
      setHasMore(false);
    }
  }, [page]);

  // 데이터 로드
  useEffect(() => {
    loadGoodsPosts();
  }, [loadGoodsPosts]);

  // 아티스트 필터링
  const filteredPosts = selectedArtist
    ? goodsPosts.filter((post) => post.artistId === selectedArtist)
    : goodsPosts;

  // 아티스트 클릭 핸들러
  const handleArtistClick = () => {
    setShowDropdown((prev) => !prev);
  };

  // 아티스트 선택 핸들러
  const handleArtistSelect = (artistId: number) => {
    setSelectedArtist(artistId === 0 ? null : artistId);
    setShowDropdown(false);
  };

  // 게시글 더 불러오기
  const loadMorePosts = () => {
    if (hasMore) {
      loadGoodsPosts();
    }
  };

  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100">
      <div className="fixed inset-0 z-[-1]">
        <BackgroundFrame />
      </div>

      <div
        id="scrollableDiv"
        className="relative w-[768px] h-[1023px] bg-white overflow-y-scroll scrollbar-hide"
      >
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
            onClick={() => navigate("/goods-post-create")}
            className="flex items-center justify-center w-[95px] h-[26px] bg-white border border-black rounded font-semibold text-black"
          >
            게시글 작성
          </button>
        </div>

        {/* 자유 게시판 이동 버튼 */}
        <div
          className="absolute flex flex-col gap-1 left-[27px] top-[147px] w-[185px] h-[32px] bg-white border rounded cursor-pointer z-40"
          onClick={() => navigate("/postlist")}
        >
          <p className="text-gray-700 font-medium text-center">
            자유 게시판 이동
          </p>
        </div>

        {/* 게시글 표시 영역 */}
        <InfiniteScroll
          loadMore={loadMorePosts}
          hasMore={hasMore}
          scrollableTarget="scrollableDiv"
        >
          <div className="grid grid-cols-3 gap-20 absolute top-[188px] left-[76px]">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="size-40 bg-white border rounded cursor-pointer"
                onClick={() => navigate(`/goods-post/${post.id}`)}
              >
                {post.imageUrl ? (
                  <img
                    className="size-full object-cover"
                    src={post.imageUrl}
                    alt={`Goods post ${post.id}`}
                  />
                ) : (
                  <img
                    className="size-full object-cover"
                    src="/GoodsPostPage/icon-feather-icon3.svg"
                    alt="default icon"
                  />
                )}
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export { GoodsPostPage };
