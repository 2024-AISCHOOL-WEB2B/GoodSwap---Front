import React, { useEffect, useCallback } from 'react';

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  children: React.ReactNode;
}

const InfiniteScroll: React.FC<InfiniteScrollProps> = ({ loadMore, hasMore, children }) => {
  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1 &&
      hasMore
    ) {
      loadMore();
    }
  }, [hasMore, loadMore]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  return <div>{children}</div>;
};

export default InfiniteScroll;
