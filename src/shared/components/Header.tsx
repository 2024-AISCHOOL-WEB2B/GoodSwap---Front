import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="absolute flex flex-col gap-2 px-6 py-4 bg-white w-full top-0 left-0">
      <h2 className="text-2xl font-semibold text-left">Goodswap</h2>
      <div className="absolute flex items-center justify-start gap-2 top-7 right-6">
        <img className="size-6" src="/PostList/icon-feather-icon0.svg" alt="icon 1" />
        <img className="size-6" src="/PostList/icon-feather-icon1.svg" alt="icon 2" />
        <img className="size-6" src="/PostList/icon-lucide-icon0.svg" alt="icon 3" />
      </div>
    </div>
  );
};

export default Header;
