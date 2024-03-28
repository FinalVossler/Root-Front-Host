import {
  IEntityReadDto,
  IFieldReadDto,
  IFileReadDto,
  IModelReadDto,
  ITheme,
  ICartReadDto,
} from "roottypes";
import { FaRegTrashCan } from "react-icons/fa6";

import { useAppDispatch, useAppSelector } from "../../../../store/hooks";
import Input from "../../../fundamentalComponents/inputs/input";
import { updateCartThunk } from "../../../../store/slices/cartSlice";
import useUpdateCart from "../../../../hooks/apiHooks/useUpdateCarts";
import validateProductQuantity from "../../../../utils/validateProductQuantity";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import getCartSubTotal from "../../../../utils/getCartSubTotal";

import useStyles from "./sideCart.styles";
import formatCentsToDollars from "../../../../utils/formatCentsToDollars";

interface ISideCartProps {}

const SideCart: React.FunctionComponent<ISideCartProps> = (
  props: ISideCartProps
) => {
  //#region selectors
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const cart: ICartReadDto | undefined = useAppSelector(
    (state) => state.cart.cart
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );
  const checkoutStaticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );
  //#endregion selectors

  //#region hooks
  const styles = useStyles({ theme });
  const dispatch = useAppDispatch();
  const { updateCart } = useUpdateCart();
  const getTranslatedText = useGetTranslatedText();
  //#endregion hooks

  //#region Event listeners
  const handleUpdateCart = (
    productInfo: { product: IEntityReadDto | string; quantity: number },
    quantity: number
  ) => {
    if (cart) {
      dispatch(
        updateCartThunk({
          entity: productInfo.product as IEntityReadDto,
          quantity,
          sided: false,
          updateApiCart: async (command) => {
            await updateCart(command);
          },
        })
      );
    }
  };
  const handleProductInfoQuantityChange =
    (productInfo: { product: IEntityReadDto | string; quantity: number }) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (
        validateProductQuantity({
          product: productInfo.product as IEntityReadDto,
          model: (productInfo.product as IEntityReadDto).model as IModelReadDto,
          notEnoughQuantityErrorText: getTranslatedText(
            staticText?.notEnoughQuantity
          ),
          quantity: parseInt(e.target.value),
          unknownQuantityErrorText: getTranslatedText(
            staticText?.unknownMaxQuantity
          ),
        })
      ) {
        handleUpdateCart(productInfo, parseInt(e.target.value));
      }
    };
  const handleRemoveProduct =
    (productInfo: { product: IEntityReadDto | string; quantity: number }) =>
    () => {
      handleUpdateCart(productInfo, 0);
    };
  //#endregion Event listeners

  return (
    <div className={styles.sideCartContainer}>
      {cart && (
        <div className={styles.totalContainer}>
          <span className={styles.subTotalTitle}>
            {getTranslatedText(staticText?.subTotal)}
          </span>
          <span className={styles.subTotal}>
            {formatCentsToDollars(getCartSubTotal(cart))}
            {getTranslatedText(checkoutStaticText?.moneyUnit)}
          </span>
        </div>
      )}

      {cart?.products
        .filter((productInfo) => !productInfo.sided)
        .map((productInfo) => {
          const model = (productInfo.product as IEntityReadDto)
            .model as IModelReadDto;
          const product = productInfo.product as IEntityReadDto;
          const imageFieldId = model.imageField as string;
          const priceFieldId = model.priceField as string;

          const imageFiles = product.entityFieldValues.find(
            (efv) =>
              (efv.field as IFieldReadDto)._id.toString() === imageFieldId
          )?.files as IFileReadDto[] | undefined;

          const price = product.entityFieldValues.find(
            (efv) =>
              (efv.field as IFieldReadDto)._id.toString() === priceFieldId
          )?.value;

          return (
            <div
              key={(productInfo.product as IEntityReadDto)._id.toString()}
              className={styles.cartSingleProduct}
            >
              {imageFiles && imageFiles.length > 0 && (
                <img className={styles.productImage} src={imageFiles[0].url} />
              )}

              <span className={styles.price}>
                {formatCentsToDollars(getTranslatedText(price))}{" "}
                {getTranslatedText(checkoutStaticText?.moneyUnit)}
              </span>

              <div className={styles.productActionsContainer}>
                <Input
                  value={
                    typeof productInfo.quantity === "number" &&
                    !Number.isNaN(productInfo.quantity)
                      ? productInfo.quantity
                      : ""
                  }
                  onChange={handleProductInfoQuantityChange(productInfo)}
                  theme={theme}
                  inputProps={{ style: { marginLeft: 0, height: 30 } }}
                  containerProps={{
                    style: { marginLeft: 10, marginBottom: 0 },
                  }}
                  debounce
                />

                <FaRegTrashCan
                  className={styles.trashIcon}
                  onClick={handleRemoveProduct(productInfo)}
                />
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SideCart;
