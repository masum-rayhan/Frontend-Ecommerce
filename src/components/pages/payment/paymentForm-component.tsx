import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { toastNotify } from "../../../helper";
import { orderSummaryProps } from "../order/orderSummaryProps";
import { cartItemModel } from "../../../interfaces";

const PaymentForm = ({ data, userInput }: orderSummaryProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setProcessing] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "https://example.com/order/123/complete",
      },
      redirect: "if_required",
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      toastNotify("An unexpected error occurred.", "error");

      setProcessing(false);
    } else {
      console.log(result);
      // {
      //     "pickupName": "string",
      //     "pickupPhoneNumber": "string",
      //     "pickupEmail": "string",
      //     "applicationUserId": "string",
      //     "orderTotal": 0,
      //     "stripePaymentIntentId": "string",
      //     "status": "string",
      //     "totalItems": 0,

      const orderDetailsDTO: any[] = [];
      data.cartItems.forEach((item: cartItemModel) => {
        const tempOrderDetails: any = {};
        tempOrderDetails["menuItemId"] = item.menuItem?.id;
        tempOrderDetails["quantity"] = item.quantity;
        tempOrderDetails["itemName"] = item.menuItem?.name;
        tempOrderDetails["price"] = item.menuItem?.price;

        orderDetailsDTO.push(tempOrderDetails);
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button className="btn btn-success mt-5 w-100">Submit</button>
    </form>
  );
};

export default PaymentForm;
