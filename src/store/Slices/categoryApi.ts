// store/Slices/categoryApi.ts
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface Category {
  _id: string;
  categoryName: string;
  image:File,
  imageUrl?: string;
  createdAt: string;
  imagePreview?:string
}

export const categoryApi = createApi({
  reducerPath: 'categoryApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: 'https://fahadpervez-backend-803d.onrender.com/api/v1/',
  }),
  tagTypes: ['Category'],
  endpoints: (builder) => ({
    // Try different endpoint variations
    getCategories: builder.query<Category[], void>({
      query: () => 'category', 
      providesTags: ['Category'],
      transformResponse: (response: { data: Category[] } | Category[]) => {
        if (response && typeof response === 'object' && 'data' in response) {
          return response.data;
        }
        return response as Category[];
      },
    }),
    
    createCategory: builder.mutation<Category, FormData>({
      query: (formData) => ({
        url: 'category', 
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Category'],
    }),
    
    updateCategory: builder.mutation<Category, { id: string; formData: FormData }>({
      query: ({ id, formData }) => ({
        url: `category/${id}`, 
        method: 'PUT',
        body: formData,
      }),
      invalidatesTags: ['Category'],
    }),
    
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({
        url: `category/${id}`, 
        method: 'DELETE',
      }),
      invalidatesTags: ['Category'],
    }),
  }),
});

export const { 
  useGetCategoriesQuery, 
  useCreateCategoryMutation, 
  useUpdateCategoryMutation, 
  useDeleteCategoryMutation 
} = categoryApi;