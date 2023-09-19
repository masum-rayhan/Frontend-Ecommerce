import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const orderApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://foodfancywebapi.azurewebsites.net/",
  }),
  endpoints: (builder) => ({   
    initiatePayment : builder.mutation({
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

export const { useInitiatePaymentMutation } = orderApi;
export default orderApi;
