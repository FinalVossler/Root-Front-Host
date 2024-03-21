import React from "react";
import { IEntityReadDto, IModelReadDto, ITheme } from "roottypes";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import Button from "../../../../fundamentalComponents/button";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";
import Input from "../../../../fundamentalComponents/inputs/input";
import { updateCartThunk } from "../../../../../store/slices/cartSlice";
import useUpdateCart from "../../../../../hooks/apiHooks/useUpdateCarts";
import validateProductQuantity from "../../../../../utils/validateProductQuantity";

import useStyles from "./entityEditorEcommerceAddons.styles";

interface IEntityEditorEcommerceAddonsProps {
  entity: IEntityReadDto;
  model: IModelReadDto;
}

const EntityEditorEcommerceAddons: React.FunctionComponent<
  IEntityEditorEcommerceAddonsProps
> = (props: IEntityEditorEcommerceAddonsProps) => {
  const [quantity, setQuantity] = React.useState<number>(1);

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

  const handleAddToCart = () => {
    if (
      validateProductQuantity({
        product: props.entity,
        model: props.entity.model as IModelReadDto,
        notEnoughQuantityErrorText: getTranslatedText(
          staticText?.notEnoughQuantity
        ),
        quantity,
        unknownQuantityErrorText: getTranslatedText(
          staticText?.unknownMaxQuantity
        ),
      })
    ) {
      dispatch(
        updateCartThunk({
          entity: props.entity,
          quantity,
          updateApiCart: async (command) => {
            await updateCart(command);
          },
        })
      );

      toast.success(getTranslatedText(staticText?.addedToCart));
    }
  };

  if (!props.model.isForSale) {
    return null;
  }

  return (
    <div className={styles.entityEditorEcommerceAddonsContainer}>
      <Input
        theme={theme}
        label={getTranslatedText(staticText?.quantity)}
        value={
          typeof quantity === "number" && !Number.isNaN(quantity)
            ? quantity
            : ""
        }
        inputProps={{ type: "number" }}
        onChange={(e) => setQuantity(parseInt(e.target.value))}
      />
      <Button type="button" theme={theme} onClick={handleAddToCart}>
        {getTranslatedText(staticText?.addToCart)}
      </Button>
    </div>
  );
};

export default EntityEditorEcommerceAddons;
