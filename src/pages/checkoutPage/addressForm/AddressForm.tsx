import React from "react";
import {
  IAddressCreateCommand,
  IAddressReadDto,
  IAddressUpdateCommand,
  ITheme,
} from "roottypes";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppSelector } from "../../../store/hooks";

import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import FormikInput from "../../../components/fundamentalComponents/formikInputs/formikInput";
import Button from "../../../components/fundamentalComponents/button";

import useStyles from "./addressForm.styles";
import useCreateAddress from "../../../hooks/apiHooks/useCreateAddress";
import useUpdateAddress from "../../../hooks/apiHooks/useUpdateAddress";
import useSetDefaultAddress from "../../../hooks/apiHooks/useDefaultAddress";

interface IAddressFormForm {
  country: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  region: string;
  city: string;
}

interface IAddressFormProps {
  address?: IAddressReadDto;
  onCancelClick?: () => void;
  onSubmit?: () => void;
}

const AddressForm: React.FunctionComponent<IAddressFormProps> = (
  props: IAddressFormProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );
  const user = useAppSelector((state) => state.user.user);

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { createAddress, loading: createLoading } = useCreateAddress();
  const { updateAddress, loading: updateLoading } = useUpdateAddress();
  const { setDefaultAddress, loading: setAsDefaultLoading } =
    useSetDefaultAddress();

  const formik = useFormik<IAddressFormForm>({
    initialValues: {
      country: props.address?.country || "",
      postalCode: props.address?.postalCode || "",
      addressLine1: props.address?.addressLine1 || "",
      addressLine2: props.address?.addressLine2 || "",
      region: props.address?.region || "",
      city: props.address?.city || "",
    },
    validationSchema: Yup.object().shape({
      country: Yup.string().required(getTranslatedText(staticText?.required)),
      postalCode: Yup.string().required(
        getTranslatedText(staticText?.required)
      ),
      region: Yup.string().required(getTranslatedText(staticText?.required)),
      city: Yup.string().required(getTranslatedText(staticText?.required)),
    }),
    onSubmit: (values: IAddressFormForm) => {
      // Here save the address in the current user information
      if (props.address) {
        const command: IAddressUpdateCommand = {
          _id: props.address._id,
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          city: values.city,
          country: values.country,
          postalCode: values.postalCode,
          region: values.region,
          userId: user._id.toString(),
        };
        updateAddress(command);
        if (props.onSubmit) props.onSubmit();
      } else {
        const command: IAddressCreateCommand = {
          addressLine1: values.addressLine1,
          addressLine2: values.addressLine2,
          city: values.city,
          country: values.country,
          postalCode: values.postalCode,
          region: values.region,
          userId: user._id.toString(),
        };

        createAddress(command);
        if (props.onSubmit) props.onSubmit();
      }
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();

    formik.submitForm();
  };

  const handleSetAsDefault = () => {
    if (props.address?._id) setDefaultAddress(props.address?._id.toString());
    if (props.onSubmit) {
      props.onSubmit();
    }
  };
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (props.onCancelClick) {
      props.onCancelClick();
    }
  };

  const loading = createLoading || updateLoading || setAsDefaultLoading;

  return (
    <form className={styles.addressFormContainer} onSubmit={handleSubmit}>
      <h2 className={styles.addressTitle}>
        {getTranslatedText(staticText?.address)}
      </h2>
      <FormikInput
        name="country"
        formik={formik}
        label={getTranslatedText(staticText?.country)}
        labelStyles={{ width: "150px" }}
        inputProps={{
          style: { flex: 1 },
          placeholder: getTranslatedText(staticText?.country),
          disabled: loading,
        }}
        theme={theme}
      />
      <FormikInput
        name="addressLine1"
        formik={formik}
        label={getTranslatedText(staticText?.addressLine1)}
        inputProps={{
          style: { flex: 1 },
          placeholder: getTranslatedText(staticText?.addressLine1),
          disabled: loading,
        }}
        labelStyles={{ width: "150px" }}
        theme={theme}
      />
      <FormikInput
        name="addressLine2"
        formik={formik}
        label={getTranslatedText(staticText?.addressLine2)}
        labelStyles={{ width: "150px" }}
        inputProps={{
          style: { flex: 1 },
          placeholder: getTranslatedText(staticText?.addressLine2),
          disabled: loading,
        }}
        theme={theme}
      />

      <div className={styles.section}>
        <FormikInput
          name="postalCode"
          formik={formik}
          label={getTranslatedText(staticText?.postalCode)}
          labelStyles={{ width: "fit-content" }}
          inputProps={{
            style: { flex: 1 },
            placeholder: getTranslatedText(staticText?.postalCode),
          }}
          theme={theme}
        />
        <FormikInput
          name="region"
          formik={formik}
          label={getTranslatedText(staticText?.region)}
          labelStyles={{ width: "fit-content" }}
          inputProps={{
            style: { flex: 1 },
            placeholder: getTranslatedText(staticText?.region),
            disabled: loading,
          }}
          theme={theme}
        />
        <FormikInput
          name="city"
          formik={formik}
          label={getTranslatedText(staticText?.city)}
          labelStyles={{ width: "fit-content" }}
          inputProps={{
            style: { flex: 1 },
            placeholder: getTranslatedText(staticText?.city),
            disabled: loading,
          }}
          theme={theme}
        />
      </div>

      <div className={styles.actions}>
        <Button type="submit" theme={theme} disabled={loading}>
          {getTranslatedText(staticText?.saveAddress)}
        </Button>

        {props.address?._id && (
          <Button
            type="button"
            theme={theme}
            onClick={handleSetAsDefault}
            disabled={loading}
            style={{ marginLeft: 10 }}
          >
            {getTranslatedText(staticText?.setAsDefault)}
          </Button>
        )}

        {props.onCancelClick && (
          <Button
            type="button"
            theme={theme}
            disabled={loading}
            onClick={handleCancel}
            style={{ marginLeft: 10 }}
          >
            {getTranslatedText(staticText?.cancel)}
          </Button>
        )}
      </div>
    </form>
  );
};

export default AddressForm;
