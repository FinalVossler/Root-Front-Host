import React from "react";
import { ITheme } from "roottypes";
import { useFormik } from "formik";
import * as Yup from "yup";

import { useAppSelector } from "../../../store/hooks";

import useGetTranslatedText from "../../../hooks/useGetTranslatedText";
import FormikInput from "../../../components/fundamentalComponents/formikInputs/formikInput";
import Button from "../../../components/fundamentalComponents/button";

import useStyles from "./addressForm.styles";

interface IAddressFormForm {
  country: string;
  postalCode: string;
  addressLine1: string;
  addressLine2: string;
  region: string;
  city: string;
}

interface IAddressFormProps {}

const AddressForm: React.FunctionComponent<IAddressFormProps> = (
  props: IAddressFormProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.checkout
  );

  const styles = useStyles({ theme });
  const getTranslated = useGetTranslatedText();

  const formik = useFormik<IAddressFormForm>({
    initialValues: {
      country: "",
      postalCode: "",
      addressLine1: "",
      addressLine2: "",
      region: "",
      city: "",
    },
    validationSchema: Yup.object().shape({
      country: Yup.string().required(getTranslated(staticText?.required)),
      postalCode: Yup.string().required(getTranslated(staticText?.required)),
      region: Yup.string().required(getTranslated(staticText?.required)),
      city: Yup.string().required(getTranslated(staticText?.required)),
    }),
    onSubmit: (values: IAddressFormForm) => {
      // Here save the address in the current user information
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    formik.submitForm();
  };

  return (
    <form className={styles.addressFormContainer} onSubmit={handleSubmit}>
      <h2 className={styles.addressTitle}>
        {getTranslated(staticText?.address)}
      </h2>
      <FormikInput
        name="country"
        formik={formik}
        label={getTranslated(staticText?.country)}
        labelStyles={{ width: "150px" }}
        inputProps={{
          style: { flex: 1 },
          placeholder: getTranslated(staticText?.country),
        }}
        theme={theme}
      />
      <FormikInput
        name="addressLine1"
        formik={formik}
        label={getTranslated(staticText?.addressLine1)}
        inputProps={{
          style: { flex: 1 },
          placeholder: getTranslated(staticText?.addressLine1),
        }}
        labelStyles={{ width: "150px" }}
        theme={theme}
      />
      <FormikInput
        name="addressLine2"
        formik={formik}
        label={getTranslated(staticText?.addressLine2)}
        labelStyles={{ width: "150px" }}
        inputProps={{
          style: { flex: 1 },
          placeholder: getTranslated(staticText?.addressLine2),
        }}
        theme={theme}
      />

      <div className={styles.section}>
        <FormikInput
          name="postalCode"
          formik={formik}
          label={getTranslated(staticText?.postalCode)}
          labelStyles={{ width: "fit-content" }}
          inputProps={{
            style: { flex: 1 },
            placeholder: getTranslated(staticText?.postalCode),
          }}
          theme={theme}
        />
        <FormikInput
          name="region"
          formik={formik}
          label={getTranslated(staticText?.region)}
          labelStyles={{ width: "fit-content" }}
          inputProps={{
            style: { flex: 1 },
            placeholder: getTranslated(staticText?.region),
          }}
          theme={theme}
        />
        <FormikInput
          name="city"
          formik={formik}
          label={getTranslated(staticText?.city)}
          labelStyles={{ width: "fit-content" }}
          inputProps={{
            style: { flex: 1 },
            placeholder: getTranslated(staticText?.city),
          }}
          theme={theme}
        />
      </div>

      <Button type="submit" theme={theme}>
        {getTranslated(staticText?.save)}
      </Button>
    </form>
  );
};

export default AddressForm;
