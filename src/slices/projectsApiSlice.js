import { apiSlice } from "./apiSlice";
import { API_ENDPOINTS } from "../config/constants";

export const projectsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: ({ page = 1, topic, title, tags, sortBy }) => {
        const params = new URLSearchParams({ page: page.toString() });
        if (topic) params.append('topic', topic);
        if (title) params.append('title', title);
        if (tags) params.append('tags', tags);
        if (sortBy) params.append('sortBy', sortBy);
        return `${API_ENDPOINTS.PROJECTS}?${params.toString()}`;
      },
      providesTags: ['Project'],
    }),
    getProject: builder.query({
      query: (id) => `${API_ENDPOINTS.PROJECTS}/${id}`,
      providesTags: (result, error, id) => [{ type: 'Project', id }],
    }),
    createProject: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.PROJECTS,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Project'],
    }),
    updateProject: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${API_ENDPOINTS.PROJECTS}/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Project', id }],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `${API_ENDPOINTS.PROJECTS}/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Project'],
    }),
    getUserProjects: builder.query({
      query: ({ userId, page = 1 }) => 
        `${API_ENDPOINTS.PROJECTS}/user/${userId}?page=${page}`,
      providesTags: ['Project'],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetProjectQuery,
  useCreateProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useGetUserProjectsQuery,
} = projectsApiSlice;

