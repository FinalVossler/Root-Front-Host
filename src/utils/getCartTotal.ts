import { ICartReadDto, IShippingMethodReadDto } from "roottypes";

import getCartSubTotal from "./getCartSubTotal";

const getCartTotal = (
  cart: ICartReadDto,
  shippingMethod?: IShippingMethodReadDto
): number => {
  return getCartSubTotal(cart) + (shippingMethod?.price || 0);
};

export default getCartTotal;
