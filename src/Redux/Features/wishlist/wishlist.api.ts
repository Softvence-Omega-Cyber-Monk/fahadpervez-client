import { baseApi } from "@/Redux/BaseApi";

const wishListApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addWishlist: builder.mutation({
            query: (productId) => {
              return({
                url: "/wishlist",
                method: "POST",
                body: { productId }
            })
            },
            invalidatesTags : ["WISHLIST"]
        }),
        removeWishList : builder.mutation({
            query : (productId) =>({
                url : `/wishlist/${productId}`,
                method : "DELETE"
            }),
            invalidatesTags : ["WISHLIST"]
        }),
        getAllWishList : builder.query({
            query : () =>{
                return{
                url : `/wishlist`,
                method : "GET"
            }
            },
            providesTags : ["WISHLIST"]
        })
    })
});

export const {useAddWishlistMutation , useGetAllWishListQuery , useRemoveWishListMutation} = wishListApi;