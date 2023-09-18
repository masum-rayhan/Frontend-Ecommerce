import { RootState } from "../../../storage/redux/store";
import { useSelector } from "react-redux";
import { apiResponse, cartItemModel } from "../../../interfaces";
import { inputHelper } from "../../../helper";
import { useState } from "react";
import { MiniLoader } from "../common";
import { useInitiatePaymentMutation } from "../../../apis/payment-api";
import { useNavigate } from "react-router-dom";

const CartPickUpDetails = () => {
  const [initiatePayment] = useInitiatePaymentMutation();
  const [loading, setLoading] = useState(false);
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  const userData = useSelector((state: RootState) => state.userAuthStore);
  let grandTotal = 0;
  let totalItems = 0;
  const initialUserData = {
    name: userData.unique_name,
    email: userData.email,
    phoneNumber: "",
  };

  const [userInput, setUserInput] = useState(initialUserData);

  const handleUserInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(event, userInput);
    setUserInput(tempData);
  };

  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.quantity ?? 0) * (cartItem.menuItem?.price ?? 0);
    return null;
  });

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    const { data }: apiResponse = await initiatePayment(userData.nameid);
    const orderSummary = { grandTotal, totalItems };
    console.log(data)
    navigate("/payment", {
      state: { apiResult: data?.result, userData, orderSummary },
    });
  };

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form onSubmit={handleSubmit} className="col-10 mx-auto">
        <div className="form-group mt-3">
          Pickup Name
          <input
            type="text"
            value={userInput.name}
            className="form-control"
            placeholder="name..."
            onChange={handleUserInput}
            name="name"
            required
          />
        </div>
        <div className="form-group mt-3">
          Pickup Email
          <input
            type="email"
            value={userInput.email}
            className="form-control"
            placeholder="email..."
            onChange={handleUserInput}
            name="email"
            required
          />
        </div>

        <div className="form-group mt-3">
          Pickup Phone Number
          <input
            type="number"
            value={userInput.phoneNumber}
            className="form-control"
            placeholder="phone number..."
            onChange={handleUserInput}
            name="phoneNumber"
            required
          />
        </div>
        <div className="form-group mt-3">
          <div className="card p-3" style={{ background: "ghostwhite" }}>
            <h5>Grand Total : ${grandTotal.toFixed()}</h5>
            <h5>No of items : {totalItems}</h5>
          </div>
        </div>
        <button
          type="submit"
          className="btn btn-lg btn-success form-control mt-3"
          disabled={loading}
        >
          {loading ? <MiniLoader /> : "Looks Good? Place Order!"}
        </button>
      </form>
    </div>
  );
};

export default CartPickUpDetails;
