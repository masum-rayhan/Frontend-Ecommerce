import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://foodfancywebapi.azurewebsites.net/",
  }),
  endpoints: (builder) => ({   
    initialPayment : builder.mutation({
      query: (userId) => ({
        url: `menuItem`,
        method: "POST",
        params: {
          userId: userId,
        }
      }),
    }),
  }),
});

export const { useInitialPaymentMutation } = paymentApi;
export default paymentApi;
