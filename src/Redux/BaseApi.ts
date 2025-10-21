import { ProjectConfig } from "@/Config/config";
import { logout, setUser } from "@/store/Slices/AuthSlice/authSlice";
import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: `${ProjectConfig.apiBaseUrl}/api/v1`,
  credentials: "include",
});

const baseQueryWithRefreshToken: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  console.log(result,"BaseApi Result")
  if (result.error && result.error.status === 401) {
    const refreshResult = await fetch(`${ProjectConfig.apiBaseUrl}/api/v1/users/refresh-token`,{
      method: "POST",
      credentials: "include"}).then(res => res.json());

    console.log(refreshResult,"BaseApi Refresh Result")
    if (refreshResult) {
      api.dispatch(setUser(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
      console.log(result,"BaseApi Result2")
    } else {
      api.dispatch(logout());
    }
  }
  return result;
};

export const baseApi = createApi({
  reducerPath: "BaseApi",
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
  tagTypes: [
    "USER",
    "PRODUCTS",
    "ORDER",
    "MESSAGE",
    "ADMIN",
    "CATEGORY",
    "DELETED_PRODUCTS",
    "CATEGORY",
    "MY_ORDER",
    "ORDER_ADMIN",
  ],
});
