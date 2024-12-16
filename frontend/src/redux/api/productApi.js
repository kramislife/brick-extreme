import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1",
  }),
  endpoints: (builder) => ({
    // --------------------------------- GET PRODUCTS ---------------------------------------

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

    // --------------------------------- GET PRODUCT DETAILS ---------------------------------------

    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
    }),

    // --------------------------------- ADD A NEW PRODUCT ---------------------------------------

    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/admin/newProduct`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    // --------------------------------- UPDATE A PRODUCT ---------------------------------------

    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/admin/updateProduct/${id}`,
        method: "PUT",
        body: body,
      }),
      invalidatesTags: ["Products"],
    }),

    // --------------------------------- DELETE A PRODUCT ---------------------------------------

    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),

    // --------------------------------- GET CATEGORIES ---------------------------------------

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
  }),
});

export const {
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useGetCategoryQuery,
  useGetCollectionQuery,
  useGetSkillLevelsQuery,
  useGetDesignersQuery,
  useGetCategoryByKeyQuery,
  useDeleteProductMutation,
} = productApi;
