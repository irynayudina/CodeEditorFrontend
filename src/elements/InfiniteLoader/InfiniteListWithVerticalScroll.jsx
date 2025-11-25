import React, { useCallback } from "react";
import { ListGroup } from "react-bootstrap";
import Loader from "../Loader";
import "./List.scss";
import DiscussionDisplay from "../../pages/Discussions/DiscussionDisplay";
import { useInfiniteQuery } from "../../hooks/useInfiniteQuery";
import { apiClient } from "../../utils/api";
import { API_ENDPOINTS } from "../../config/constants";

/**
 * Infinite scroll list component for discussions
 * @param {Object} filerObj - Filter object with topic, title, tags, sortBy
 */
export default function InfiniteListWithVerticalScroll({ filerObj = {} }) {
  const fetchDiscussions = useCallback(async (page, filterObj) => {
    const params = new URLSearchParams({ page: page.toString() });
    if (filterObj.topic) params.append('topic', filterObj.topic);
    if (filterObj.title) params.append('title', filterObj.title);
    if (filterObj.tags) params.append('tags', filterObj.tags);
    if (filterObj.sortBy) params.append('sortBy', filterObj.sortBy);
    
    const response = await apiClient.get(`${API_ENDPOINTS.DISCUSSIONS_ALL}?${params.toString()}`);
    return {
      data: response.data.discussions || [],
      totalPages: response.data.totalPages || 1,
    };
  }, []);

  const { items, loading, hasNextPage, error, sentryRef } = useInfiniteQuery(
    fetchDiscussions,
    filerObj
  );

  if (error) {
    return (
      <ListGroup>
        <ListGroup.Item className="text-danger">
          Error loading discussions: {error}
        </ListGroup.Item>
      </ListGroup>
    );
  }

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
