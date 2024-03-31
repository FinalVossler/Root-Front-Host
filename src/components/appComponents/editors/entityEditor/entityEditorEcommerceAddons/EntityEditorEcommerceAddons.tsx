import React from "react";
import { IEntityReadDto, IModelReadDto, ITheme } from "roottypes";
import { toast } from "react-toastify";
import { FormikProps } from "formik";

import { useAppDispatch, useAppSelector } from "../../../../../store/hooks";
import Button from "../../../../fundamentalComponents/button";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";
import Input from "../../../../fundamentalComponents/inputs/input";
import { updateCartThunk } from "../../../../../store/slices/cartSlice";
import useUpdateCart from "../../../../../hooks/apiHooks/useUpdateCarts";
import validateProductQuantity from "../../../../../utils/validateProductQuantity";

import useStyles from "./entityEditorEcommerceAddons.styles";
import useGetShippingMethods from "../../../../../hooks/apiHooks/useGetShippingMethods";
import InputSelect from "../../../../fundamentalComponents/inputs/inputSelect";
import { IInputSelectOption } from "../../../../fundamentalComponents/inputs/inputSelect/InputSelect";
import { IEntityEditorFormFormik } from "../EntityEditorForm";

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
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );
  const shippingMethods = useAppSelector(
    (state) => state.shippingMethod.shippingMethods
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const dispatch = useAppDispatch();
  const { updateCart } = useUpdateCart();
  const { getShippingMethods, loading: loadingShippingMethods } =
    useGetShippingMethods();

  // Loading shipping methods if the entity model is sellable
  React.useEffect(() => {
    getShippingMethods();
  }, []);

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
          sided: false,
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

  const shippingMethodsOptions: IInputSelectOption[] = shippingMethods?.map(
    (s) => ({ label: getTranslatedText(s.name), value: s._id })
  );

  return (
    <div className={styles.entityEditorEcommerceAddonsContainer}>
      <InputSelect
        isMulti
        theme={theme}
        onMultiChange={(options) =>
          props.formik.setFieldValue(
            "availableShippingMethodsIds",
            options.map((o) => o.value)
          )
        }
        value={shippingMethodsOptions.filter((el) =>
          props.formik.values.availableShippingMethodsIds.some(
            (sid) => sid === el.value
          )
        )}
        label={getTranslatedText(staticText?.availableShippingMethods)}
        options={shippingMethodsOptions}
        disabled={props.readOnly}
      />
      {props.entity && (
        <React.Fragment>
          {" "}
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
        </React.Fragment>
      )}
    </div>
  );
};

export default EntityEditorEcommerceAddons;
