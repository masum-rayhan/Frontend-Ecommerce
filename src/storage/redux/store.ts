import { configureStore } from "@reduxjs/toolkit";
import { menuItemReducer } from "./menuItem-slice";
import { authApi, menuItemApi, paymentApi, shoppingCartApi } from "../../apis";
import { shoppingCartReducer } from "./shoppingCart-slice";
import { userAuthReducer } from "./userAuth-slice";

const store = configureStore({
  reducer: {
    menuItemStore: menuItemReducer,
    shoppingCartStore: shoppingCartReducer,
    userAuthStore: userAuthReducer,
    
    [menuItemApi.reducerPath]: menuItemApi.reducer,
    [shoppingCartApi.reducerPath]: shoppingCartApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(menuItemApi.middleware)
      .concat(shoppingCartApi.middleware)
      .concat(authApi.middleware)
      .concat(paymentApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
