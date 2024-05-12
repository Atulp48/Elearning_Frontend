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
        body: data,
        credentials: "include" as const,
      }),
    }),
    getUserCourses: builder.query({
      query: () => ({
        url: "get-courses",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getUserCoursesbyId: builder.query({
      query: (id) => ({
        url: `get-course/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getCourseDetails: builder.query({
      query: (id) => ({
        url: `get-course-content/${id}`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addQuestion: builder.mutation({
      query: ({ courseId, question, contentId }) => ({
        url: `add-question`,
        method: "PUT",
        body: { courseId, question, contentId },
        credentials: "include" as const,
      }),
    }),
    addAnswer: builder.mutation({
      query: ({ courseId, contentId, questionId, answer }) => ({
        url: `add-answer`,
        method: "PUT",
        body: { courseId, contentId, questionId, answer },
        credentials: "include" as const,
      }),
    }),
    addReviews: builder.mutation({
      query: ({ review, rating, id }) => ({
        url: `/add-review/${id}`,
        method: "PUT",
        body: { review, rating },
        credentials: "include" as const,
      }),
    }),
    addReply: builder.mutation({
      query: ({ comment, courseId, reviewId }) => ({
        url: `add-reply`,
        method: "PUT",
        body: { comment, courseId, reviewId },
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
  useGetUserCoursesQuery,
  useGetUserCoursesbyIdQuery,
  useGetCourseDetailsQuery,
  useAddQuestionMutation,
  useAddAnswerMutation,
  useAddReviewsMutation,
  useAddReplyMutation,
} = courseApi;
