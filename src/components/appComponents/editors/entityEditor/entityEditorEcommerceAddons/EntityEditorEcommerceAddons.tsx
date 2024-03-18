import { IEntityReadDto, IModelReadDto, ITheme } from "roottypes";

import useStyles from "./entityEditorEcommerceAddons.styles";
import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import Button from "../../../../fundamentalComponents/button";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";
import Input from "../../../../fundamentalComponents/inputs/input";
import React from "react";
import { cartSlice } from "../../../../../store/slices/cartSlice";

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

  const handleAddToCart = () => {
    dispatch(
      cartSlice.actions.setCartProductQuantity({
        entity: props.entity,
        quantity,
      })
    );
  };

  if (!props.model.isForSale) {
    return null;
  }

  return (
    <div className={styles.entityEditorEcommerceAddonsContainer}>
      <Input
        theme={theme}
        label={getTranslatedText(staticText?.quantity)}
        value={quantity}
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
