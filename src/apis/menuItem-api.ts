import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const menuItemApi = createApi({
  reducerPath: "menuItemApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://foodfancywebapi.azurewebsites.net/",
  }),
  tagTypes: ["MenuItem"],
  endpoints: (builder) => ({
    getMenuItems: builder.query({
      query: () => ({
        url: `menuItem`,
      }),
      providesTags: ["MenuItem"],
    }),
    getMenuItemsById: builder.query({
        query: (id) => ({
          url: `menuItem/&{id}}`,
        }),
        providesTags: ["MenuItem"],
      }),
  }),
});

export const { useGetMenuItemsQuery, useGetMenuItemsByIdQuery } = menuItemApi;
export default menuItemApi;
