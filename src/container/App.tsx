import { Header, Home, Footer } from "../components/layout";
import { Routes, Route } from "react-router-dom";
import { MenuItemDetails, NotFound } from "../components/pages/menu-items";
import { useDispatch } from "react-redux";
import { useGetShoppingCartQuery } from "../apis/shoppingCart-api";
import { useEffect } from "react";
import { setShoppingCart } from "../storage/redux/shoppingCart-slice";

const App = () => {
  const dispatch = useDispatch();

  const { data, isLoading } = useGetShoppingCartQuery(
    "6ee5c807-dda5-4336-8c60-36ea8b2898be"
  );

  useEffect(() => {
    if (!isLoading) {
      console.log(data.result);
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
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
