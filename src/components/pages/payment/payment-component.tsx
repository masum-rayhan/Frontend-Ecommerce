import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from ".";
import { OrderSummary } from "../order";

const Payment = () => {
  const {
    state: { apiResult, userInput },
  } = useLocation();

  const stripePromise = loadStripe(
    "pk_test_51NpIcuDQU4UPnjyg8xt6kbprus1esmopzjSDSbLUtS0Fi8HSv4IzzX0ucdCjPOGoskNDMI9h4EDaR7pZNuF6jZJ800oKe6dGdR"
  );

  const options = {
    // passing the client secret obtained from the server
    clientSecret: apiResult.clientSecret,
  };

  return (
    <div>
      <Elements stripe={stripePromise} options={options}>
        <div className="container m-5 p-5">
          <div className="row">
            <div className="col-md-7">
              <OrderSummary />
            </div>
            <div className="col-md-5">
              <PaymentForm />
            </div>
          </div>
        </div>
      </Elements>
    </div>
  );
};

export default Payment;
