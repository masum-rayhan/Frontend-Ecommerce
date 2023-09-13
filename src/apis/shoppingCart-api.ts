import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const shoppingCartApi = createApi({
  reducerPath: "shoppingCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://foodfancywebapi.azurewebsites.net/",
  }),
  tagTypes: ["ShoppingCarts"],
  endpoints: (builder) => ({
    getShoppingCart: builder.query({
      query: (userid) => ({
        url: `shopping-cart`,
        params: {
          userid: userid,
        },
      }),
      providesTags: ["ShoppingCarts"],
    }),
    updateShoppingCart: builder.mutation({
      query: ({ userid, menuItemId, updateQuantityBy }) => ({
        url: `shopping-cart`,
        method: "POST",
        params: {
          userid,
          menuItemId,
          updateQuantityBy,
        },
      }),
      invalidatesTags: ["ShoppingCarts"],
    }),
  }),
});

export const { useGetShoppingCartQuery, useUpdateShoppingCartMutation } = shoppingCartApi;
export default shoppingCartApi;
