import React, { useState, useEffect } from "react";
import axios from "axios";
import Loader from "../Loader";
import { ListGroup } from "react-bootstrap";
import useInfiniteScroll from "react-infinite-scroll-hook";
import "./List.scss";
import DiscussionDisplay from "../../pages/Discussions/DiscussionDisplay";
function useLoadItems(filerObj) {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  let filterQuery = filerObj.topic ? `&topic=${filerObj.topic}` : "";
  if (filerObj.title) {
    filterQuery += `&title=${filerObj.title}`;
  }
  if (filerObj.tags) {
    filterQuery += `&tags=${filerObj.tags}`;
  }
  const loadMore = async () => {
    if (!loading && hasNextPage) {
      setLoading(true);
      try {
        const response = await axios.get(`/api/discussions/all?page=${page}${filterQuery}`);
        // setItems((prevItems) => [...prevItems, ...response.data.discussions]);
        setItems((prevItems) => {
          // Filter out duplicate items
          const uniqueItems = response.data.discussions.filter((item) => {
            // Check if the item's _id is not present in any of the previous items
            return !prevItems.some((prevItem) => prevItem._id === item._id);
          });

          // Concatenate the unique items with the previous items
          return [...prevItems, ...uniqueItems];
        });
        setPage((prevPage) => {
          const nextPage = prevPage + 1;
          setHasNextPage(nextPage <= response.data.totalPages);
          return nextPage;
        });
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  
  // var once = function (fn) {
  //   let prevFilterQuery = null;
  //   let vCounter = 0;
  //   return function (filterQuery, v, ...args) {
  //     if (filterQuery !== prevFilterQuery) {
  //       prevFilterQuery = filterQuery;
  //       vCounter = 0;
  //     }
  //     vCounter += 1;
  //     if (vCounter === 1) {
  //       return fn(filterQuery, v, ...args);
  //     } else {
  //       return undefined;
  //     }
  //   };
  // };
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
  const statesReset = () => {
    setPage(1);
    setHasNextPage(true);
    setLoading(false);
    setItems([]);
  };
  let onceFn = once(loadMore);
  let onceInit = once(statesReset);
  const listReset = () => {
    statesReset();
    loadMore();
  }
  let onceRunList = once(listReset);
  useEffect(() => {
    // onceInit();
    // onceFn();
    onceRunList();
    console.log(filterQuery);
  }, [filerObj]);


  return { loading, items, hasNextPage, error, loadMore };
}

//create your forceUpdate hook
// function useForceUpdate(){
//     const [value, setValue] = useState(0); // integer state
//     return () => setValue(value => value + 1); // update state to force render
//     // A function that increment 👆🏻 the previous state like here 
//     // is better than directly setting `setValue(value + 1)`
// }

export default function InfiniteListWithVerticalScroll({ filerObj }) {
  // call your hook here
  let { loading, items, hasNextPage, error, loadMore } =
    useLoadItems(filerObj);
  // const forceUpdate = useForceUpdate();
  // useEffect(() => {
  //   forceUpdate();
  //   console.log(filerObj);
  //   ({ loading, items, hasNextPage, error, loadMore } =
  //   useLoadItems(filerObj));
  // }, [filerObj]);
  
  

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
        <DiscussionDisplay key={item._id} discussion={item} />
      ))}
      {(loading || hasNextPage) && (
        <ListGroup.Item ref={sentryRef}>
          <Loader />
        </ListGroup.Item>
      )}
    </ListGroup>
  );
}
