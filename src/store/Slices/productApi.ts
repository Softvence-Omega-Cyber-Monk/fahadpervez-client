// products.api.ts
import { baseApi } from "@/Redux/BaseApi";

const productsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              queryParams.append(key, String(value));
            }
          });
        }
        return {
          url: `/products${queryParams.toString() ? `?${queryParams.toString()}` : ""}`,
        };
      },
      providesTags: ["PRODUCTS"],
    }),
    getProductById: builder.query({
      query: ({ id }) => ({
        url: `/products/${id}`,
      }),
      providesTags: ["PRODUCTS"],
    }),
    addProduct: builder.mutation({
      query: (data) => ({
        url: `/products`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
    addBulkProduct: builder.mutation({
      query: (data) => ({
        url: `/products/bulk`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
    getAllProductsAdmin: builder.query({
      query: () => ({
        url: `/products/admin`,
      }),
      providesTags: ["PRODUCTS"],
    }),
    getProductByIdAdmin: builder.query({
      query: ({ id }) => ({
        url: `/products/admin/${id}`,
      }),
      providesTags: ["PRODUCTS"],
    }),
    getMyProducts: builder.query({
      query: () => ({
        url: `/products/my/products`,
      }),
      providesTags: ["PRODUCTS"],
    }),
    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/products/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
    deleteProductById: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["PRODUCTS"],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useLazyGetAllProductsQuery,
  useGetProductByIdQuery,
  useLazyGetProductByIdQuery,
  useAddProductMutation,
  useAddBulkProductMutation,
  useGetAllProductsAdminQuery,
  useGetProductByIdAdminQuery,
  useGetMyProductsQuery,
  useUpdateProductMutation,
  useDeleteProductByIdMutation,
} = productsApi;