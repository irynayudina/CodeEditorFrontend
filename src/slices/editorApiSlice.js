import { apiSlice } from "./apiSlice";
import { API_ENDPOINTS } from "../config/constants";

export const editorApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    executeCode: builder.mutation({
      query: (data) => ({
        url: API_ENDPOINTS.EXECUTE,
        method: 'POST',
        body: data,
      }),
    }),
    getCollaboration: builder.query({
      query: (projectId) => 
        `${API_ENDPOINTS.COLLAB}/projectId?associatedProject_id=${projectId}`,
      providesTags: ['Collaboration'],
    }),
    saveFile: builder.mutation({
      query: (data) => ({
        url: `${API_ENDPOINTS.COLLAB}/save`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Collaboration'],
    }),
  }),
});

export const {
  useExecuteCodeMutation,
  useGetCollaborationQuery,
  useSaveFileMutation,
} = editorApiSlice;

