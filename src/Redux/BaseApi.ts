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
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery(
      "/users/refresh-token",
      api,
      extraOptions
    );
    if (refreshResult.data) {
      api.dispatch(setUser(refreshResult.data));
      result = await baseQuery(args, api, extraOptions);
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
