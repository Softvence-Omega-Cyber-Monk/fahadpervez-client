import { baseApi } from "@/Redux/BaseApi";

const userApi = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        getAllBuyers : builder.query({
            query : () =>({
                url : "/users/customers"
            })
        }),
        getAllSellers : builder.query({
            query : () =>({
                url : "/users/vendors"
            })
        })
    })
});


export const {useGetAllBuyersQuery , useGetAllSellersQuery} = userApi;