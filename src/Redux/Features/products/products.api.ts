import { baseApi } from "@/Redux/BaseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllProducts:builder.query({
            query:()=>({
                url:`/products`
            }),
            providesTags:["PRODUCTS"]
        }),
        getProductById:builder.query({
            query:(id)=>({
                url:`/products/${id}`
            })
        }),
        addProduct:builder.mutation({
            query:(data)=>({
                url:`/products`,
                method:"POST",
                body:data
            }),
            invalidatesTags:["PRODUCTS"]
        }),
        addBulkProduct:builder.mutation({
            query:(data)=>({
                url:`/products/bulk`,
                method:"POST",
                body:data
            })
        }),
        getAllProductsAdmin:builder.query({
            query:()=>({
                url:`/products/admin`
            })
        }),
        getProductByIdAdmin:builder.query({
            query:()=>({
                url:`/products/admin/{id}`
            })
        }),
        getMyProducts:builder.query({
            query:()=>({
                url:`/products/my/products`
            }),
            providesTags:["PRODUCTS"]
        }),
        updateProduct:builder.mutation({
            query:(data)=>({
                url:`/products/${data.id}`,
                method:"PUT",
                body:data
            })
        }),
        deleteProductById:builder.mutation({
            query:(id)=>({
                url:`/products/${id}`,
                method:"DELETE"
            }),
            invalidatesTags:["PRODUCTS"]
        })
    })})


    export const {useGetAllProductsQuery,useGetProductByIdQuery,useAddProductMutation,useAddBulkProductMutation, useGetAllProductsAdminQuery,useGetProductByIdAdminQuery,useGetMyProductsQuery,useUpdateProductMutation,useDeleteProductByIdMutation} = productsApi