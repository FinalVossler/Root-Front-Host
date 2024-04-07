import React from "react";
import { ITheme } from "roottypes";

import { useAppSelector } from "../../../../../store/hooks";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";
import Input from "../../../../fundamentalComponents/inputs/input";

interface IEcommerceQuantityField {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export const EcommerceQuantityField: React.FunctionComponent<
  IEcommerceQuantityField
> = (props: IEcommerceQuantityField) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );

  const getTranslatedText = useGetTranslatedText();

  return (
    <Input
      theme={theme}
      label={getTranslatedText(staticText?.quantity)}
      value={
        typeof props.quantity === "number" && !Number.isNaN(props.quantity)
          ? props.quantity
          : ""
      }
      inputProps={{ type: "number" }}
      onChange={(e) => props.setQuantity(parseInt(e.target.value))}
    />
  );
};

export default EcommerceQuantityField;
