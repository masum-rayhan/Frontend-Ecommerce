import { shoppingCartModel } from "../../../interfaces";

export interface orderSummaryProps {
  data: {
    id: number;
    cartItems: shoppingCartModel[];
    cartTotal: number;
  };
  userInput: {
    name: string;
    email: string;
    phoneNumber: string;
  };
}
