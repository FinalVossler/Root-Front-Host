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
import Button from "../../../components/fundamentalComponents/button";

interface ICartProductActions {
  productInfo: {
    quantity: number;
    product: IEntityReadDto;
    sided: boolean;
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
  const language = useAppSelector((state) => state.userPreferences.language);

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
          sided: false,
          updateApiCart: async (command: ICartUpdateCommand) => {
            await updateCart(command);
          },
        })
      );
    }
  };
  const handleDeleteProduct = () => {
    dispatch(
      updateCartThunk({
        entity: props.productInfo.product,
        quantity: 0,
        sided: false,
        updateApiCart: async (command: ICartUpdateCommand) => {
          await updateCart(command);
        },
      })
    );
  };

  const handleSetForLaterOrPutBackInCart = () => {
    dispatch(
      updateCartThunk({
        entity: props.productInfo.product,
        quantity: props.productInfo.quantity,
        sided: !props.productInfo.sided,
        updateApiCart: async (command: ICartUpdateCommand) => {
          await updateCart(command);
        },
      })
    );
  };

  return (
    <div className={styles.cartProductActionsContainer}>
      {!props.productInfo.sided && (
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
          inputProps={{ type: "number", style: { width: 70 } }}
          labelStyles={{ width: "fit-content" }}
          containerProps={{ style: { marginBottom: 0, marginRight: 10 } }}
        />
      )}

      <Button theme={theme} onClick={handleDeleteProduct}>
        {getTranslatedText(staticText?.delete)}
      </Button>
      <Button
        theme={theme}
        onClick={handleSetForLaterOrPutBackInCart}
        style={{ marginLeft: 10 }}
      >
        {props.productInfo.sided
          ? getTranslatedText(staticText?.putBackInCart)
          : getTranslatedText(staticText?.setForLater)}
      </Button>
    </div>
  );
};

export default CartProductActions;
