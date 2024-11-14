import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="absolute inset-x-0 top-0 w-[768px] h-[60px] bg-white rounded-lg  border border-gray-200 px-6 py-4">
      <h2 className="text-2xl font-semibold text-left">Goodswap</h2>
      <div className="absolute flex items-center justify-start gap-2 top-5 right-6">
        <img className="size-6" src="/PostList/icon-feather-icon1.svg" alt="icon 2" />
      </div>
    </div>
  );
};

export default Header;
