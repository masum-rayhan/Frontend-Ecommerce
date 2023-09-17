import { useState } from "react";
import { useGetMenuItemsByIdQuery } from "../../../apis/menuItem-api";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateShoppingCartMutation } from "../../../apis/shoppingCart-api";
import { MainLoader, MiniLoader } from "../common";
import { apiResponse } from "../../../interfaces";
import { toastNotify } from "../../../helper";

const MenuItemDetails = () => {
  const { menuItemId } = useParams();
  const { data, isLoading } = useGetMenuItemsByIdQuery(menuItemId);

  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState<boolean>(false);
  const [updateShoppingCart] = useUpdateShoppingCartMutation();

  const handleQuantity = (event: number) => {
    let newQuantity = quantity + event;
    if (newQuantity == 0) {
      newQuantity = 1;
    }
    setQuantity(newQuantity);
  };

  const handleAddToCart = async (menuItemId: number) => {
    setIsAddingToCart(true);

    const response : apiResponse= await updateShoppingCart({
      userId: "6ee5c807-dda5-4336-8c60-36ea8b2898be",
      menuItemId: menuItemId,
      updateQuantityBy: quantity,
    });

    if(response.data && response.data.isSuccess){
      toastNotify("Item added to cart successfully");
    }

    setIsAddingToCart(false);
  };

  return (
    <div className="container pt-4 pt-md-5">
      {!isLoading ? (
        <div className="row">
          <div className="col-7">
            <h2 className="text-success">{data.result?.name}</h2>
            <span>
              <span
                className="badge text-bg-dark pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.category}
              </span>
            </span>
            <span>
              <span
                className="badge text-bg-light pt-2"
                style={{ height: "40px", fontSize: "20px" }}
              >
                {data.result?.specialTag}
              </span>
            </span>
            <p style={{ fontSize: "20px" }} className="pt-2">
              {data.result?.description}
            </p>
            <span className="h3">${data.result?.price}</span> &nbsp;&nbsp;&nbsp;
            <span
              className="pb-2  p-3"
              style={{ border: "1px solid #333", borderRadius: "30px" }}
            >
              <i
                onClick={() => handleQuantity(-1)}
                className="bi bi-dash p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
              <span className="h3 mt-3 px-3">{quantity}</span>
              <i
                onClick={() => handleQuantity(+1)}
                className="bi bi-plus p-1"
                style={{ fontSize: "25px", cursor: "pointer" }}
              ></i>
            </span>
            <div className="row pt-4">
              <div className="col-5">
                {isAddingToCart ? (
                  <button disabled className="btn btn-success form-control">
                    <MiniLoader />
                  </button>
                ) : (
                  <button
                    onClick={() => handleAddToCart(data.result?.id)}
                    className="btn btn-success form-control"
                  >
                    Add to Cart
                  </button>
                )}
              </div>

              <div className="col-5 ">
                <button
                  className="btn btn-secondary form-control"
                  onClick={() => navigate(-1)}
                >
                  Back to Home
                </button>
              </div>
            </div>
          </div>
          <div className="col-5">
            <img
              src={data.result?.image}
              width="100%"
              style={{ borderRadius: "50%" }}
              alt="No content"
            ></img>
          </div>
        </div>
      ) : (
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <MainLoader />
        </div>
      )}
    </div>
  );
};

export default MenuItemDetails;
