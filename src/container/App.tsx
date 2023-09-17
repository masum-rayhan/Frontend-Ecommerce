import { Header, Home, Footer } from "../components/layout";
import { Routes, Route } from "react-router-dom";
import { MenuItemDetails, NotFound } from "../components/pages/menu-items";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../apis/shoppingCart-api";
import { useEffect } from "react";
import { setShoppingCart } from "../storage/redux/shoppingCart-slice";
import { ShoppingCart } from "../components/pages/cart";
import { Login, Register } from "../components/pages/auth";
import { userModel } from "../interfaces";
import jwt_decode from "jwt-decode";
import { setLoggedInUser } from "../storage/redux/userAuth-slice";

const App = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartQuery(
    "6ee5c807-dda5-4336-8c60-36ea8b2898be"
  );

  useEffect(() => {
    const localToken = localStorage.getItem("token");
    if (localToken) {
      const { unique_name, nameid, email, role }: userModel =
        jwt_decode(localToken);
      dispatch(setLoggedInUser({ unique_name, nameid, email, role }));
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      dispatch(setShoppingCart(data.result?.cartItems));
    }
  }, [data]);

  return (
    <div>
      <Header />
      <div className="pb-5">
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route
            path="/menuItemDetails/:menuItemId"
            element={<MenuItemDetails />}
          ></Route>
          <Route path="/shopping-cart" element={<ShoppingCart />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
