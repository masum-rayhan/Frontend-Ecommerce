import { cartItemModel } from ".";

export default interface shoppingCartModel {
  id?: number;
  userId?: string;
  stripePaymentIntentId?: any;
  clientSecret?: any;
  cartItems?: cartItemModel[];
  cartTotal?: number;
}
