import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllorders: builder.query({
      query: () => ({
        url: "get-orders",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    getStripePublishkey: builder.query({
      query: () => ({
        url: "payment/stripePublishkey",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    createPay: builder.mutation({
      query: (amount) => ({
        url: "payment",
        method: "POST",
        body: { amount },
        credentials: "include" as const,
      }),
    }),

    createOrder: builder.mutation({
      query: ({ courseId, payment_info }) => ({
        url: "create-order",
        method: "POST",
        body: { courseId, payment_info },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllordersQuery,
  useCreatePayMutation,
  useGetStripePublishkeyQuery,
  useCreateOrderMutation,
} = orderApi;
