import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fahadpervez-backend-803d.onrender.com' }),
  endpoints: (builder) => ({
    createProduct: builder.mutation<any, any>({
      query: (newProduct) => ({
        url: 'products',
        method: 'POST',
        body: newProduct,
      }),
    }),
  }),
});

export const { useCreateProductMutation } = productApi;
