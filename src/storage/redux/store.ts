import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItem-slice";
import { menuItemApi, shoppingCartApi } from "../../apis";
import { shoppingCartReducer } from "./shoppingCart-slice";

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
