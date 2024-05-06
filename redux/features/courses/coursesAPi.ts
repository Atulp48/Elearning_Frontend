import { apiSlice } from "../api/apiSlice";

export const courseApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCourse: builder.mutation({
      query: (data) => ({
        url: "create-course",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),

    getAllcourse: builder.query({
      query: () => ({
        url: "get-allcourses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    deleteCourse: builder.mutation({
      query: (id) => ({
        url: `delete-course/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    editCourse: builder.mutation({
      query: ({ id, data }) => ({
        url: `edit-course/${id}`,
        method: "PUT",
        body:data,
        credentials: "include" as const,
      }),
    }),
    getUserCourses:builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

  }),
});

export const {
  useCreateCourseMutation,
  useGetAllcourseQuery,
  useDeleteCourseMutation,
  useEditCourseMutation,
  useGetUserCoursesQuery
} = courseApi;
