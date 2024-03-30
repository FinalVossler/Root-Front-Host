import {
  ICartReadDto,
  IEntityReadDto,
  IShippingMethodReadDto,
} from "roottypes";

import getCartProductsTotal from "./getCartProductsTotal";
import { IProductSelectedShippingMethod } from "../pages/checkoutPage/CheckoutPage";
import getCartShippingMethodsTotal from "./getCartShippingMethodsTotal";

const getCartTotal = (
  cart: ICartReadDto,
  productsSelectedShippingMethods: IProductSelectedShippingMethod[],
  shippingMethods: IShippingMethodReadDto[]
): number => {
  return (
    getCartProductsTotal(cart) +
    getCartShippingMethodsTotal({
      productsInfo: cart.products.map((productInfo) => {
        const selectedShippingMethodId = productsSelectedShippingMethods.find(
          (el) => el.productId === (productInfo.product as IEntityReadDto)._id
        )?.shippingMethodId;
        return {
          product: productInfo.product as IEntityReadDto,
          quantity: productInfo.quantity,
          shippingMethod: shippingMethods.find(
            (shippingMethod) =>
              shippingMethod._id.toString() === selectedShippingMethodId
          ),
        };
      }),
    })
  );
};

export default getCartTotal;
