import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    // Fetch products with optional query parameters
    getProducts: builder.query({
      query: (queryString) => {
        if (typeof queryString === "object") {
          const params = new URLSearchParams();
          Object.entries(queryString).forEach(([key, value]) => {
            params.append(key, Array.isArray(value) ? value.join(",") : value);
          });
          queryString = params.toString();
        }
        return `/products?${queryString}`;
      },
      providesTags: ["Products"],
    }),

    // Fetch product categories
    getCategory: builder.query({
      query: () => `/categories`,
    }),

    // Fetch product collections
    getCollection: builder.query({
      query: () => `/collections`,
    }),

    // Fetch skill levels
    getSkillLevels: builder.query({
      query: () => `/skillLevels`,
    }),

    // Fetch designers
    getDesigners: builder.query({
      query: () => `/designers`,
    }),

    // Fetch category details by key
    getCategoryByKey: builder.query({
      query: (key) => `/categories/${key}`,
    }),

    // Fetch product details by ID
    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),

    // Create a new product
    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/admin/newProduct`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    // Delete a product by ID
    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
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
  useCreateProductMutation,
  useDeleteProductMutation,
} = productApi;
