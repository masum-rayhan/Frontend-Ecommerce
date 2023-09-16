import { RootState } from "../../../storage/redux/store";
import { useSelector } from "react-redux";
import { cartItemModel } from "../../../interfaces";
import { inputHelper } from "../../../helper";
import { useState } from "react";

const CartPickUpDetails = () => {
  const shoppingCartFromStore: cartItemModel[] = useSelector(
    (state: RootState) => state.shoppingCartStore.cartItems ?? []
  );
  let grandTotal = 0;
  let totalItems = 0;
  const initialUserData = {
    name: "",
    email: "",
    phoneNumber: "",
  }

  const [userInput, setUserInput] = useState(initialUserData);

  const handleUserInput = (event : React.ChangeEvent<HTMLInputElement>) => {
    const tempData = inputHelper(event, userInput);
    setUserInput(tempData);
  }

  shoppingCartFromStore?.map((cartItem: cartItemModel) => {
    totalItems += cartItem.quantity ?? 0;
    grandTotal += (cartItem.quantity ?? 0) * (cartItem.menuItem?.price ?? 0);
    return null;
  });

  return (
    <div className="border pb-5 pt-3">
      <h1 style={{ fontWeight: "300" }} className="text-center text-success">
        Pickup Details
      </h1>
      <hr />
      <form className="col-10 mx-auto">
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
        >
          Looks Good? Place Order!
        </button>
      </form>
    </div>
  );
};

export default CartPickUpDetails;
