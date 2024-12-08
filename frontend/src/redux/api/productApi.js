import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams(params).toString();
        return `/products?${queryParams}`;
      },
    }),

    getCategory: builder.query({
      query: () => `/categories`,
    }),

    getCollection: builder.query({
      query: () => `/collections`,
    }),

    getSkillLevels: builder.query({
      query: () => `/skillLevels`,
    }),

    getDesigners: builder.query({
      query: () => `/designers`,
    }),

    getCategoryByKey: builder.query({
      query: (key) => `/categories/${key}`,
    }),

    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});
export const {
  useGetProductsQuery,
  useGetCategoryQuery,
  useGetCollectionQuery,
  useGetSkillLevelsQuery,
  useGetDesignersQuery,
  useGetCategoryByKeyQuery,
  useGetProductDetailsQuery,
} = productApi;
