import { ICartReadDto } from "roottypes";

const getCartTotalProducts = (cart: ICartReadDto): number => {
  const totalProducts: number = cart.products
    .filter((productInfo) => !productInfo.sided)
    .reduce((acc, productInfo) => acc + productInfo.quantity, 0);

  return Number.isNaN(totalProducts) ? 0 : totalProducts;
};

export default getCartTotalProducts;
