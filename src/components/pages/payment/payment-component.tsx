import { useLocation } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { PaymentForm } from ".";

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
        <PaymentForm />
      </Elements>
    </div>
  );
};

export default Payment;
