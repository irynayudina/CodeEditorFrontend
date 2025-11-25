import { useState, useEffect, useCallback } from 'react';
import { useInfiniteScroll as useInfiniteScrollHook } from 'react-infinite-scroll-hook';

/**
 * Custom hook for infinite scroll with RTK Query or manual fetching
 * @param {Function} fetchFn - Function to fetch data, receives page number and filterObj
 * @param {Object} filterObj - Filter object that triggers reset when changed
 * @param {Object} options - Additional options
 * @returns {Object} - { items, loading, hasNextPage, error, sentryRef }
 */
export const useInfiniteQuery = (fetchFn, filterObj = {}, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [resetCompleted, setResetCompleted] = useState(false);

  const loadMore = useCallback(async () => {
    if (!loading && hasNextPage) {
      setLoading(true);
      setError(null);
      try {
        const response = await fetchFn(page, filterObj);
        const { data: newItems, totalPages } = response;
        
        setItems((prevItems) => {
          // Filter out duplicate items by _id
          const uniqueItems = newItems.filter((item) => {
            return !prevItems.some((prevItem) => prevItem._id === item._id);
          });
          return [...prevItems, ...uniqueItems];
        });
        
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          setHasNextPage(nextPage <= totalPages);
          return nextPage;
        });
      } catch (err) {
        setError(err.message || 'Failed to load items');
      } finally {
        setLoading(false);
      }
    }
  }, [loading, hasNextPage, page, fetchFn, filterObj]);

  const reset = useCallback(() => {
    setPage(1);
    setHasNextPage(true);
    setLoading(false);
    setItems([]);
    setError(null);
    setResetCompleted(true);
  }, []);

  // Reset when filters change
  useEffect(() => {
    const hasFilters = Object.values(filterObj).some(val => val !== null && val !== undefined && val !== '');
    if (hasFilters) {
      setResetCompleted(false);
      reset();
    }
  }, [JSON.stringify(filterObj)]); // eslint-disable-line react-hooks/exhaustive-deps

  // Load initial data after reset
  useEffect(() => {
    if (resetCompleted && items.length === 0) {
      loadMore();
    }
  }, [resetCompleted]); // eslint-disable-line react-hooks/exhaustive-deps

  const [sentryRef] = useInfiniteScrollHook({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: options.rootMargin || "0px 0px 400px 0px",
  });

  return {
    items,
    loading,
    hasNextPage,
    error,
    sentryRef,
  };
};

