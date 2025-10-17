import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE;

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Products", "Categories", "Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (email) => ({
        url: "/auth",
        method: "POST",
        body: { email },
      }),
      invalidatesTags: ["Auth"],
    }),
    getProducts: builder.query({
      query: ({ offset = 0, limit = 10, search = "", categoryId } = {}) => {
        const params = new URLSearchParams({ offset, limit });
        if (search) return `/products/search?searchedText=${search}`;
        if (categoryId) params.append("categoryId", categoryId);
        return `/products?${params.toString()}`;
      },
      providesTags: ["Products"],
    }),
    getProduct: builder.query({
      query: (slug) => `/products/${slug}`,
      providesTags: ["Products"],
    }),
    createProduct: builder.mutation({
      query: (body) => ({
        url: "/products",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Products"],
    }),
    updateProduct: builder.mutation({
      query: ({ id, body }) => ({
        url: `/products/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Products"],
    }),


    deleteProduct: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products"],
    }),
    getCategories: builder.query({
      query: ({ offset = 0, limit = 10, search = "" } = {}) => {
        if (search) return `/categories/search?searchedText=${search}`;
        return `/categories?offset=${offset}&limit=${limit}`;
      },
      providesTags: ["Categories"],
    }),
  }),
});

export const {
  useLoginMutation,
  useGetProductsQuery,
  useGetProductQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetCategoriesQuery,
} = api;
