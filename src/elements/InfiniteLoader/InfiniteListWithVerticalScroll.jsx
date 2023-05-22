import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import { ListGroup } from "react-bootstrap";
import useInfiniteScroll from "react-infinite-scroll-hook";
import "./List.scss";
import DiscussionDisplay from "../../pages/Discussions/DiscussionDisplay";
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
        const response = await axios.get(`/api/discussions/all?page=${page}`);
        console.log(response);
        setItems((prevItems) => [...prevItems, ...response.data.discussions]);
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          setHasNextPage(nextPage <= response.data.totalPages);
          return nextPage;
        });
        console.log(page);
        console.log(hasNextPage);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    onceFn();
  }, []);
  var once = function (fn) {
    let counter = 0;
    return function (...args) {
      counter += 1;
      if (counter === 1) {
        return fn(...args);
      } else {
        return undefined;
      }
    };
  };
  let onceFn = once(loadMore);

  return { loading, items, hasNextPage, error, loadMore };
}

export default function InfiniteListWithVerticalScroll() {
  const { loading, items, hasNextPage, error, loadMore } = useLoadItems();

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: !!error,
    rootMargin: "0px 0px 400px 0px",
  });

  return (
    <ListGroup>
      {items.map((item) => (
          <DiscussionDisplay key={item._id} discussion={item}/>
      ))}
      {(loading || hasNextPage) && (
        <ListGroup.Item ref={sentryRef}>
          <Loader />
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}
