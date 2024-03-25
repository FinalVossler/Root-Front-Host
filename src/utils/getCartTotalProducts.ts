import { ICartReadDto } from "roottypes";

const getCartTotalProducts = (
  cart: ICartReadDto | undefined | null
): number => {
  if (!cart) return 0;

  const totalProducts: number = cart.products
    .filter((productInfo) => !productInfo.sided)
    .reduce((acc, productInfo) => acc + productInfo.quantity, 0);

  return Number.isNaN(totalProducts) ? 0 : totalProducts;
};

export default getCartTotalProducts;
