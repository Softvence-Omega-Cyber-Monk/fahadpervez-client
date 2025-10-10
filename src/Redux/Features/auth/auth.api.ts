import { baseApi } from "@/Redux/BaseApi";
import { ILogin } from "@/Redux/types/Auth/atuh.type";


const authApi = baseApi.injectEndpoints({
    endpoints : (builder) =>({
        logInUser : builder.mutation({
            query : (data : ILogin) =>({
                url : "/users/login",
                method : "POST",
                body : data
            })
        }),
        getMe : builder.query({
            query : () =>({
                url : "/users/profile"
            })
        }),
        refreshToken : builder.mutation({
            query : () => ({
                url : "/users/refresh-token",
                method : "POST"
            })
        })
    })
});


export const {useLogInUserMutation , useGetMeQuery , useRefreshTokenMutation} = authApi