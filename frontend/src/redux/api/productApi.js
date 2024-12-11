import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: (queryString) => {
        // If queryString is an object, convert it to string
        if (typeof queryString === 'object') {
          const params = new URLSearchParams();
          Object.entries(queryString).forEach(([key, value]) => {
            if (key === 'rating') {
              // Handle rating parameter specifically
              params.append(key, Array.isArray(value) ? value.join(',') : value);
            } else if (Array.isArray(value)) {
              params.append(key, value.join(','));
            } else {
              params.append(key, value);
            }
          });
          queryString = params.toString();
        }
        
        return `/products?${queryString}`;
      },
      // Add tags for cache invalidation if needed
      providesTags: ['Products'],
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

