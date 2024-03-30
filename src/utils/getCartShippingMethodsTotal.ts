import {
  IEntityReadDto,
  IShippingMethodReadDto,
  IUserReadDto,
} from "roottypes";

interface IGetcartShippingMethodsTotalParams {
  productsInfo: {
    product: IEntityReadDto;
    quantity: number;
    shippingMethod: IShippingMethodReadDto | undefined;
  }[];
}

const getCartShippingMethodsTotal = (
  params: IGetcartShippingMethodsTotalParams
): number => {
  // Find the total of shipping methods by owner (Each owner is going to be paid for each individual shipping method chosen for him)
  const ownersShippingMethods: { [ownerId: string]: IShippingMethodReadDto[] } =
    {};

  params.productsInfo.forEach((productInfo) => {
    if (productInfo.product.owner) {
      const owner = productInfo.product.owner as IUserReadDto;
      const ownerShippingMethods: IShippingMethodReadDto[] =
        ownersShippingMethods[owner._id.toString()] || [];
      // Add the shipping method id if it isn't already added:
      if (
        productInfo.shippingMethod &&
        !ownerShippingMethods.some(
          (shippingMethod) =>
            shippingMethod._id.toString() ===
            (
              productInfo.shippingMethod as IShippingMethodReadDto
            )._id.toString()
        )
      ) {
        // Push the shipping method
        ownersShippingMethods[owner._id.toString()] = [
          ...(ownersShippingMethods[owner._id.toString()] || []),
          productInfo.shippingMethod,
        ];
      }
    }
  });

  const totalShippingMethodsPrice: number = Object.keys(
    ownersShippingMethods
  ).reduce((acc, key) => {
    return (
      acc +
      ownersShippingMethods[key].reduce(
        (secAcc, shippingMethod) => secAcc + shippingMethod.price,
        0
      )
    );
  }, 0);

  console.log("totalShippingMethodsPrice", totalShippingMethodsPrice);

  return totalShippingMethodsPrice;
};

export default getCartShippingMethodsTotal;
