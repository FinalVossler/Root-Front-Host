import React from "react";
import { ITheme } from "roottypes";
import { FormikProps } from "formik";

import { useAppSelector } from "../../../../../store/hooks";
import useGetTranslatedText from "../../../../../hooks/useGetTranslatedText";

import useGetShippingMethods from "../../../../../hooks/apiHooks/useGetShippingMethods";
import InputSelect from "../../../../fundamentalComponents/inputs/inputSelect";
import { IInputSelectOption } from "../../../../fundamentalComponents/inputs/inputSelect/InputSelect";
import { IEntityEditorFormFormik } from "../EntityEditorForm";

interface IEcommerceShippingMethodsField {
  formik: FormikProps<IEntityEditorFormFormik>;
  readOnly: boolean;
}

const EcommerceShippingMethodsField: React.FunctionComponent<
  IEcommerceShippingMethodsField
> = (props: IEcommerceShippingMethodsField) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.entities
  );
  const shippingMethods = useAppSelector(
    (state) => state.shippingMethod.shippingMethods
  );

  const getTranslatedText = useGetTranslatedText();
  const { getShippingMethods, loading: loadingShippingMethods } =
    useGetShippingMethods();

  // Loading shipping methods if the entity model is sellable
  React.useEffect(() => {
    getShippingMethods();
  }, []);

  const shippingMethodsOptions: IInputSelectOption[] = shippingMethods?.map(
    (s) => ({ label: getTranslatedText(s.name), value: s._id })
  );

  return (
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
  );
};

export default EcommerceShippingMethodsField;
