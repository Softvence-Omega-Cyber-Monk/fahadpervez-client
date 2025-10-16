import { ProjectConfig } from "@/Config/config";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
    reducerPath: "BaseApi",
    baseQuery: fetchBaseQuery({
        baseUrl : `${ProjectConfig.apiBaseUrl}/api/v1`,
        credentials : "include"
    }),
    
    endpoints: () => ({}),
    tagTypes : ["USER", "PRODUCTS", "ORDER", "MESSAGE", "ADMIN", "CATEGORY","DELETED_PRODUCTS"],
});