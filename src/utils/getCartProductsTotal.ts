import {
  ICartReadDto,
  IEntityReadDto,
  IFieldReadDto,
  IModelReadDto,
} from "roottypes";

const getCartProductsTotal = (cart: ICartReadDto): number => {
  const total: number = cart.products
    .filter((productInfo) => !productInfo.sided)
    .reduce((acc, productInfo) => {
      const priceFieldId: string = (
        (productInfo.product as IEntityReadDto).model as IModelReadDto
      ).priceField as string;

      const price = parseInt(
        (productInfo.product as IEntityReadDto).entityFieldValues
          .find(
            (efv) =>
              (efv.field as IFieldReadDto)._id.toString() === priceFieldId
          )
          ?.value.at(0)?.text || "0"
      );
      const subTotal = price * productInfo.quantity;

      return acc + subTotal;
    }, 0);

  return Number.isNaN(total) ? 0 : total;
};

export default getCartProductsTotal;
