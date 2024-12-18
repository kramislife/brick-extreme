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

    // GET PRODUCT DETAILS

    getProductDetails: builder.query({
      query: (id) => `/products/${id}`,
      providesTags: (result, error, id) => [
        { type: "ProductDetails", id },
        { type: "Product", id },
      ],
    }),

    // ADD A NEW PRODUCT

    createProduct: builder.mutation({
      query: (newProduct) => ({
        url: `/admin/newProduct`,
        method: "POST",
        body: newProduct,
      }),
      invalidatesTags: ["Products"],
    }),

    // UPDATE A PRODUCT

    updateProduct: builder.mutation({
      query: ({ id, productData }) => ({
        url: `/admin/product/${id}`,
        method: "PUT",
        body: productData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Products",
        { type: "Product", id },
        { type: "ProductDetails", id },
      ],
    }),

    // DELETE A PRODUCT

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
      providesTags: ["Categories"],
    }),

    // GET CATEGORY BY KEY

    getCategoryByKey: builder.query({
      query: (key) => `/categories/${key}`,
    }),

    // ADD A NEW CATEGORY

    createCategory: builder.mutation({
      query: (data) => ({
        url: "/admin/newCategory",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // UPDATE A CATEGORY

    updateCategory: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/category/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Categories"],
    }),

    // DELETE A CATEGORY

    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `/admin/category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Categories"],
    }),

    // --------------------------------- GET COLLECTIONS ---------------------------------------

    getCollection: builder.query({
      query: () => `/collections`,
      providesTags: ["Collections"],
    }),

    // GET COLLECTION BY KEY

    getCollectionByKey: builder.query({
      query: (key) => `/collections/${key}`,
    }),

    // ADD A NEW COLLECTION

    createCollection: builder.mutation({
      query: (data) => ({
        url: "/admin/newCollection",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Collections"],
    }),

    // UPDATE A COLLECTION

    updateCollection: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/collection/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Collections"],
    }),

    // DELETE A COLLECTION

    deleteCollection: builder.mutation({
      query: (id) => ({
        url: `/admin/collection/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Collections"],
    }),

    // --------------------------------- GET SKILL LEVELS ---------------------------------------

    getSkillLevels: builder.query({
      query: () => `/skillLevels`,
      providesTags: ["SkillLevels"],
    }),

    // GET SKILL LEVEL BY KEY

    getSkillLevelByKey: builder.query({
      query: (key) => `/skillLevels/${key}`,
    }),

    // ADD A NEW SKILL LEVEL
    createSkillLevel: builder.mutation({
      query: (data) => ({
        url: "/admin/newSkillLevel",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["SkillLevels"],
    }),

    // UPDATE A SKILL LEVEL

    updateSkillLevel: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/skillLevel/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["SkillLevels"],
    }),

    // DELETE A SKILL LEVEL

    deleteSkillLevel: builder.mutation({
      query: (id) => ({
        url: `/admin/skillLevel/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["SkillLevels"],
    }),

    // --------------------------------- GET DESIGNERS ---------------------------------------

    getDesigners: builder.query({
      query: () => `/designers`,
      providesTags: ["Designers"],
    }),

    // GET DESIGNER BY KEY

    getDesignerByKey: builder.query({
      query: (key) => `/designers/${key}`,
    }),

    // ADD A NEW DESIGNER
    createDesigner: builder.mutation({
      query: (data) => ({
        url: "/admin/newDesigner",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Designers"],
    }),

    // UPDATE A DESIGNER
    updateDesigner: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/admin/designer/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Designers"],
    }),

    // DELETE A DESIGNER
    deleteDesigner: builder.mutation({
      query: (id) => ({
        url: `/admin/designer/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Designers"],
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
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useCreateCollectionMutation,
  useCreateSkillLevelMutation,
  useCreateDesignerMutation,
  useUpdateCollectionMutation,
  useDeleteCollectionMutation,
  useUpdateSkillLevelMutation,
  useDeleteSkillLevelMutation,
  useUpdateDesignerMutation,
  useDeleteDesignerMutation,
} = productApi;
