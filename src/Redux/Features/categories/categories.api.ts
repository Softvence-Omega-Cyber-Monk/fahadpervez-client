import { baseApi } from "@/Redux/BaseApi";

const categoriesApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllCategories:builder.query({
            query:()=>({
                url:`/category`
            }),
            providesTags:['CATEGORY']
        }),
        createNewCategory:builder.mutation({
            query:(data)=>{
                return({
                url:`/category`,
                method:'POST',
                headers: {
                Authorization: `Bearer ${data.token}`,
                },
                body:data.categoryFormData
            })
            },
            invalidatesTags:['CATEGORY']
        }) ,
        getSingleCategoryById:builder.query({
            query:(id)=>({
                url:`/category/${id}`
            }) 
        }),
        updateCategoryById:builder.mutation({
            query:(data)=>{
                return({
                url:`/category/${data.id}`,
                method:'PUT',
                body:data.formData
            })
            },
            invalidatesTags:['CATEGORY']
        }),
        deleteCategoryById:builder.mutation({
            query:(id)=>({
                url:`/category/${id}`,
                method:'DELETE'
            }),
            invalidatesTags:['CATEGORY']
        })  
})
})

export const {useGetAllCategoriesQuery,useCreateNewCategoryMutation,useGetSingleCategoryByIdQuery,useUpdateCategoryByIdMutation,useDeleteCategoryByIdMutation} = categoriesApi
