import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://foodfancywebapi.azurewebsites.net/",
  }),
  endpoints: (builder) => ({   
    createOrder : builder.mutation({
      query: (orderDetails) => ({
        url: `order/create-order`,
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: orderDetails,
      }),
    }),
  }),
});

export const { useCreateOrderMutation } = orderApi;
export default orderApi;
