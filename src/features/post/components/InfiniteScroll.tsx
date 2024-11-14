import React, { useEffect, useCallback } from "react";

interface InfiniteScrollProps {
  loadMore: () => void;
  hasMore: boolean;
  children: React.ReactNode;
  scrollableTarget?: string;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  loadMore,
  hasMore,
  children,
  scrollableTarget,
}) => {
  const handleScroll = useCallback(() => {
    const target = scrollableTarget
      ? document.getElementById(scrollableTarget)
      : window;

    if (!target) return;

    // `window` 객체와 `HTMLElement`를 구분하여 처리
    const scrollTop =
      target instanceof Window ? window.scrollY : target.scrollTop;
    const scrollHeight =
      target instanceof Window
        ? document.documentElement.scrollHeight
        : target.scrollHeight;
    const clientHeight =
      target instanceof Window ? window.innerHeight : target.clientHeight;

    // 스크롤 위치가 끝에 도달했을 때
    if (scrollTop + clientHeight >= scrollHeight - 1 && hasMore) {
      loadMore();
    }
  }, [hasMore, loadMore, scrollableTarget]);

  useEffect(() => {
    const target = scrollableTarget
      ? document.getElementById(scrollableTarget)
      : window;
    if (!target) return;

    target.addEventListener("scroll", handleScroll);
    return () => {
      target.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll, scrollableTarget]);

  return <div>{children}</div>;
};
