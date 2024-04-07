import React from "react";
import { IEntityReadDto, IModelReadDto, ITheme } from "roottypes";
import { FormikProps } from "formik";

import { useAppSelector } from "../../../../../store/hooks";

import { IEntityEditorFormFormik } from "../EntityEditorForm";
import EcommerceQuantityField from "./EcommerceQuantityField";
import EcommerceShippingMethodsField from "./EcommerceShippingMethodsField";
import EcommerceAddToCartButton from "./EcommerceAddToCartButton";

import useStyles from "./entityEditorEcommerceAddons.styles";

interface IEntityEditorEcommerceAddonsProps {
  entity: IEntityReadDto;
  model: IModelReadDto;
  formik: FormikProps<IEntityEditorFormFormik>;
  readOnly: boolean;
}

const EntityEditorEcommerceAddons: React.FunctionComponent<
  IEntityEditorEcommerceAddonsProps
> = (props: IEntityEditorEcommerceAddonsProps) => {
  const [quantity, setQuantity] = React.useState<number>(1);

  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const styles = useStyles({ theme });

  if (!props.model.isForSale) {
    return null;
  }

  return (
    <div className={styles.entityEditorEcommerceAddonsContainer}>
      <EcommerceShippingMethodsField
        formik={props.formik}
        readOnly={props.readOnly}
      />
      {props.entity && (
        <React.Fragment>
          {" "}
          <EcommerceQuantityField
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <EcommerceAddToCartButton quantity={quantity} entity={props.entity} />
        </React.Fragment>
      )}
    </div>
  );
};

export default EntityEditorEcommerceAddons;
