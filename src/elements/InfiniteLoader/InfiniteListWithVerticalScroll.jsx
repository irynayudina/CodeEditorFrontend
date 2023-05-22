import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
function useLoadItems() {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const loadMore = async () => {
    if (!loading && hasNextPage) {
      setLoading(true);
      try {
        const response = await axios.get(`/api/items?page=${page}`);
        setItems((prevItems) => [...prevItems, ...response.data]);
        setPage((prevPage) => prevPage + 1);
        setHasNextPage(response.data.length > 0);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadMore();
  }, []);

  return { loading, items, hasNextPage, error, loadMore };
}

function InfiniteListWithVerticalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [sentryRef, { rootRef }] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <ListContainer
      // This where we set our scrollable root component.
      ref={rootRef}
    >
      <List>
        {items.map((item) => (
          <ListItem key={item.key}>{item.value}</ListItem>
        ))}
        {(loading || hasNextPage) && (
          <ListItem ref={sentryRef}>
            <Loader />
          </ListItem>
        )}
      </List>
    </ListContainer>
  );
}
