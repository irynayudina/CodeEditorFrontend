import { apiSlice } from "./apiSlice";
import { API_ENDPOINTS } from "../config/constants";

export const discussionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDiscussions: builder.query({
      query: ({ page = 1, topic, title, tags, sortBy }) => {
        const params = new URLSearchParams({ page: page.toString() });
        if (topic) params.append('topic', topic);
        if (title) params.append('title', title);
        if (tags) params.append('tags', tags);
        if (sortBy) params.append('sortBy', sortBy);
        return `${API_ENDPOINTS.DISCUSSIONS_ALL}?${params.toString()}`;
      },
      providesTags: ['Discussion'],
    }),
    getDiscussion: builder.query({
      query: (id) => `${API_ENDPOINTS.DISCUSSIONS}/${id}`,
      providesTags: (result, error, id) => [{ type: 'Discussion', id }],
    }),
    createDiscussion: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.DISCUSSIONS,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Discussion'],
    }),
    updateDiscussion: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${API_ENDPOINTS.DISCUSSIONS}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Discussion', id }],
    }),
    deleteDiscussion: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.DISCUSSIONS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Discussion'],
    }),
    addComment: builder.mutation({
      query: ({ discussionId, ...data }) => ({
        url: `${API_ENDPOINTS.DISCUSSIONS}/${discussionId}/comments`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: (result, error, { discussionId }) => [
        { type: 'Discussion', id: discussionId },
        'Comment',
      ],
    }),
    getComments: builder.query({
      query: ({ discussionId, page = 1 }) => 
        `${API_ENDPOINTS.DISCUSSIONS}/${discussionId}/comments?page=${page}`,
      providesTags: ['Comment'],
    }),
  }),
});

export const {
  useGetDiscussionsQuery,
  useGetDiscussionQuery,
  useCreateDiscussionMutation,
  useUpdateDiscussionMutation,
  useDeleteDiscussionMutation,
  useAddCommentMutation,
  useGetCommentsQuery,
} = discussionsApiSlice;

