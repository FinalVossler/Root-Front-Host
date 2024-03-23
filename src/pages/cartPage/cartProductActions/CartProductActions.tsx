import React from "react";
import {
  ICartUpdateCommand,
  IEntityReadDto,
  IModelReadDto,
  ITheme,
} from "roottypes";

import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import Input from "../../../components/fundamentalComponents/inputs/input";
import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import { updateCartThunk } from "../../../store/slices/cartSlice";
import useUpdateCart from "../../../hooks/apiHooks/useUpdateCarts";
import validateProductQuantity from "../../../utils/validateProductQuantity";

import useStyles from "./cartProductActions.styles";

interface ICartProductActions {
  productInfo: {
    quantity: number;
    product: IEntityReadDto;
  };
}

const CartProductActions: React.FunctionComponent<ICartProductActions> = (
  props: ICartProductActions
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const dispatch = useAppDispatch();
  const { updateCart } = useUpdateCart();

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (
      validateProductQuantity({
        product: props.productInfo.product,
        model: props.productInfo.product.model as IModelReadDto,
        notEnoughQuantityErrorText: getTranslatedText(
          staticText?.notEnoughQuantity
        ),
        quantity: parseInt(e.target.value),
        unknownQuantityErrorText: getTranslatedText(
          staticText?.unknownMaxQuantity
        ),
      })
    ) {
      dispatch(
        updateCartThunk({
          entity: props.productInfo.product,
          quantity: parseInt(e.target.value),
          updateApiCart: async (command: ICartUpdateCommand) => {
            await updateCart(command);
          },
        })
      );
    }
  };

  return (
    <div className={styles.cartProductActionsContainer}>
      <Input
        onChange={handleQuantityChange}
        label={getTranslatedText(staticText?.quantity) + ":"}
        value={
          typeof props.productInfo.quantity === "number" &&
          !Number.isNaN(props.productInfo.quantity)
            ? props.productInfo.quantity
            : ""
        }
        debounce
        theme={theme}
        labelStyles={{ width: "fit-content" }}
      />
    </div>
  );
};

export default CartProductActions;
