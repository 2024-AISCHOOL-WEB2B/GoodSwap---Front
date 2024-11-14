import React from 'react';

interface PostPaginationProps {
  totalPosts: number;
  postsPerPage: number;
  currentPage: number;
  setCurrentPage: (pageNumber: number) => void;
}

const PostPagination: React.FC<PostPaginationProps> = ({ totalPosts, postsPerPage, currentPage, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className="flex justify-center mt-5">
      <ul className="flex gap-2">
        {pageNumbers.map((number) => (
          <li key={number} className={`${number === currentPage ? 'font-bold text-blue-600' : ''}`}>
            <button
              onClick={() => setCurrentPage(number)}
              className="px-3 py-1 bg-gray-100 border border-gray-300 rounded hover:bg-gray-200"
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PostPagination;
