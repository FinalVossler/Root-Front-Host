import React from "react";
import { IEntityReadDto, IModelReadDto, ITheme } from "roottypes";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import Button from "../../../../fundamentalComponents/button";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";
import { updateCartThunk } from "../../../../../store/slices/cartSlice";
import useUpdateCart from "../../../../../hooks/apiHooks/useUpdateCarts";
import validateProductQuantity from "../../../../../utils/validateProductQuantity";

interface IEcommerceAddToCartButton {
  entity?: IEntityReadDto;
  quantity: number;
}

const EcommerceAddToCartButton: React.FunctionComponent<
  IEcommerceAddToCartButton
> = (props: IEcommerceAddToCartButton) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );

  const getTranslatedText = useGetTranslatedText();
  const dispatch = useAppDispatch();
  const { updateCart } = useUpdateCart();

  const handleAddToCart = () => {
    if (!props.entity) {
      return;
    }
    if (
      validateProductQuantity({
        product: props.entity,
        model: props.entity.model as IModelReadDto,
        notEnoughQuantityErrorText: getTranslatedText(
          staticText?.notEnoughQuantity
        ),
        quantity: props.quantity,
        unknownQuantityErrorText: getTranslatedText(
          staticText?.unknownMaxQuantity
        ),
      })
    ) {
      dispatch(
        updateCartThunk({
          entity: props.entity,
          quantity: props.quantity,
          sided: false,
          updateApiCart: async (command) => {
            await updateCart(command);
          },
        })
      );

      toast.success(getTranslatedText(staticText?.addedToCart));
    }
  };

  if (!props.entity) return null;
  return (
    <Button
      type="button"
      theme={theme}
      onClick={handleAddToCart}
      style={{ marginLeft: 0, flex: 1 }}
    >
      {getTranslatedText(staticText?.addToCart)}
    </Button>
  );
};

export default EcommerceAddToCartButton;
