import { baseApi } from "@/Redux/BaseApi";

const vendorApi = baseApi.injectEndpoints({
    endpoints:(builder)=>({
        getVendorDetails:builder.query({
            query: ()=>({
                url:`/users/vendors/`
            })
        }),
        
    })
})

export const {useGetVendorDetailsQuery} = vendorApi;