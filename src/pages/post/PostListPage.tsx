import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostPagination from '../../features/post/components/PostPagination';

interface Post {
  id: number;
  title: string;
}

const PostListPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 8;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      const tempPosts = Array.from({ length: 23 }, (_, i) => ({
        id: i + 1,
        title: `게시글 ${i + 1}`,
      }));
      setPosts(tempPosts);
    };
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  const handlePostClick = (postId: number) => {
    navigate(`/post/${postId}`);
  };

  const handleCreatePostClick = () => {
    navigate('/post/create'); // 올바른 URL로 수정
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="relative w-[768px] h-[1006px] bg-white border">
        <img className="absolute top-0 left-0 w-full h-full" src="/PostList/rectangle-970.svg" alt="rectangle" />

        <div className="absolute flex flex-col gap-2 px-6 py-4 bg-white w-full top-0 left-0">
          <h2 className="text-2xl font-semibold text-left">FanShare</h2>
        </div>

        <ul className="absolute top-[188px] left-[25px] flex flex-col space-y-2">
          {currentPosts.map((post) => (
            <li
              key={post.id}
              onClick={() => handlePostClick(post.id)}
              className="flex justify-between items-center w-[703px] h-[77px] bg-white border border-black rounded p-2 cursor-pointer hover:bg-gray-50"
            >
              <div>{post.title}</div>
              <img className="w-6 h-6 ml-auto mr-2" src="/PostList/vector0.svg" alt="vector" />
            </li>
          ))}
        </ul>

        <div className="absolute flex items-center justify-start gap-2 top-10 right-6">
          <img className="w-6 h-6" src="/PostList/icon-feather-icon0.svg" alt="icon" />
          <img className="w-6 h-6" src="/PostList/icon-feather-icon1.svg" alt="icon" />
          <img className="w-6 h-6" src="/PostList/icon-lucide-icon0.svg" alt="icon" />
        </div>

        <div className="absolute top-[147px] left-[627px]">
          <button
            onClick={handleCreatePostClick}
            className="flex items-center justify-center w-[95px] h-[26px] bg-white border border-black rounded font-semibold text-black"
          >
            게시글 작성
          </button>
        </div>

        <div className="absolute flex flex-col gap-1 left-[105px] top-[96px] w-[198px] h-[40px] bg-white border rounded">
          <p className="text-gray-700 font-medium text-center">커뮤니티</p>
        </div>

        <div className="absolute flex flex-col gap-1 left-[512px] top-[96px] w-[198px] h-[40px] bg-white border rounded">
          <p className="text-gray-700 font-medium text-center">아티스트 게시판</p>
        </div>

        <div className="absolute flex flex-col gap-1 left-[27px] top-[147px] w-[185px] h-[32px] bg-white border rounded">
          <p className="text-gray-700 font-medium text-center">전체 게시글</p>
        </div>

        <div className="absolute w-full bottom-0 flex justify-center">
          <PostPagination
            totalPosts={posts.length}
            postsPerPage={postsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </div>

      <div className="absolute top-[146px] left-[369px] flex items-center gap-2 p-2 w-[248px] h-[29px] bg-white border border-gray-400 rounded-lg">
        <img className="w-6 h-6" src="/PostList/icon-feather-icon12.svg" alt="search icon" />
        <input
          type="text"
          placeholder="Search..."
          className="text-gray-500 bg-transparent border-none focus:outline-none"
        />
      </div>

      <img className="absolute top-[101px] left-[121px] w-6 h-6" src="/PostList/icon-lucide-icon2.svg" alt="icon" />
      <img className="absolute top-[calc(50%-402px)] left-[calc(50%--109px)] w-6 h-6" src="/PostList/icon-favourite0.svg" alt="favourite icon" />
    </div>
  );
};

export default PostListPage;
