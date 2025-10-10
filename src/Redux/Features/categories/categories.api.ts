import { baseApi } from "@/Redux/BaseApi";

const categoriesApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getAllCategories:builder.query({
            query:()=>({
                url:`/category`
            })
        })

})
})

export const {useGetAllCategoriesQuery} = categoriesApi
