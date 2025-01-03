import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const checkoutApi = createApi({
  reducerPath: "checkoutApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Adjust this to match your API URL
  endpoints: (builder) => ({
    submitCheckout: builder.mutation({
      query: (orderData) => ({
        url: "/checkout",
        method: "POST",
        body: orderData,
      }),
    }),
  }),
});

export const { useSubmitCheckoutMutation } = checkoutApi;
