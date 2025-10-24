import { baseApi } from "@/Redux/BaseApi";

const wishListApi = baseApi.injectEndpoints({
    endpoints: (bulider) => ({
        addWishList: bulider.mutation({
            query: (productId) => ({
                url: "/wishlist",
                method: "POST",
                body: { productId }
            })
        }),
        removeWishList : bulider.mutation({
            query : (productId) =>({
                url : `/wishlist/${productId}`,
                method : "DELETE"
            })
        }),
        getAllWishList : bulider.query({
            query : (userID) =>{
                return{
                url : `/wishlist/${userID}`,
                method : "GET"
            }
            }
        })
    })
});

export const {useAddWishListMutation , useGetAllWishListQuery , useRemoveWishListMutation} = wishListApi;