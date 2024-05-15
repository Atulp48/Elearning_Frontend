import { apiSlice } from "../api/apiSlice";

export const notifiApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updataNotification: builder.mutation({
      query: (id) => ({
        url: `/update-notification/${id}`,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),

    getAllnotification: builder.query({
      query: () => ({
        url: "get-all-notification",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllnotificationQuery, useUpdataNotificationMutation } =
  notifiApi;
