import { useRef, useEffect, useCallback } from "react";

interface UseInfiniteScrollProps {
    status: "LoadingFirstPage" | "CanLoadMore" | "LoadingMore" | "Exhausted";
    loadMore: (numItems: number) => void;
    loadSize?: number;
    observeEnabled?: boolean
}

export const useInfiniteScroll = ({status, loadMore, loadSize = 10, observeEnabled = true}: UseInfiniteScrollProps) => {
    const topElementRef = useRef<HTMLDivElement>(null)

    const handleLoadMore = useCallback(()=>{
        if(status === "CanLoadMore") {
            loadMore(loadSize)
        }
    },[status,loadMore,loadSize])

    useEffect(()=>{
        const topElement = topElementRef.current;
        if(!(topElement && observeEnabled)) return;

        const observer = new IntersectionObserver(([entry])=> {
            if(entry?.isIntersecting) handleLoadMore()
        },{
            threshold: 0.1
        })

        observer.observe(topElement)
    },[handleLoadMore, observeEnabled])

    return {
        topElementRef,
        handleLoadMore,
        canLoadMore: status === "CanLoadMore",
        isLoadingMore: status === "LoadingMore",
        isLoadingFirsPage: status === "LoadingFirsPage",
        isExhausted: status === "Exhausted"
    }
}