import { baseApi } from "@/Redux/BaseApi";

const productsApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getProducts:builder.query({
            query:()=>({
                url:`/products`
            })
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
            })
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
            query:(id)=>({
                url:`/products/admin/${id}`
            })
        }),
        getMyProducts:builder.query({
            query:()=>({
                url:`/products/my/products`
            })
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
            })
        })



    })})


    export const {useGetProductsQuery,useGetProductByIdQuery,useAddProductMutation,useAddBulkProductMutation, useGetAllProductsAdminQuery,useGetProductByIdAdminQuery,useGetMyProductsQuery,useUpdateProductMutation,useDeleteProductByIdMutation} = productsApi
