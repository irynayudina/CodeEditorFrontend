import { apiSlice } from "./apiSlice";
import { API_ENDPOINTS } from "../config/constants";

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.AUTH,
        method: "POST",
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.REGISTER,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: API_ENDPOINTS.LOGOUT,
        method: "POST",
      }),
    }),
    getUserProfile: builder.query({
      query: (userId) => 
        `${API_ENDPOINTS.PROFILE}?userId=${userId}`,
      providesTags: (result, error, userId) => [{ type: 'User', id: userId }],
    }),
    getFollowingFollowers: builder.query({
      query: () => API_ENDPOINTS.FOLLOWING_FOLLOWERS,
      providesTags: ['User'],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.UPDATE_PROFILE,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getUserDiscussions: builder.query({
      query: ({ userId, page = 1 }) => 
        `${API_ENDPOINTS.DISCUSSIONS}/user/${userId}?page=${page}`,
      providesTags: ['Discussion'],
    }),
    getUserComments: builder.query({
      query: ({ userId, page = 1 }) => 
        `${API_ENDPOINTS.DISCUSSIONS}/user/${userId}/comments?page=${page}`,
      providesTags: ['Comment'],
    }),
    followUser: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.REGISTER}/follow`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    unfollowUser: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.REGISTER}/unfollow`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const { 
  useLoginMutation, 
  useLogoutMutation, 
  useRegisterMutation, 
  useUpdateUserMutation,
  useGetUserProfileQuery,
  useGetFollowingFollowersQuery,
  useGetUserDiscussionsQuery,
  useGetUserCommentsQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
} = usersApiSlice;
