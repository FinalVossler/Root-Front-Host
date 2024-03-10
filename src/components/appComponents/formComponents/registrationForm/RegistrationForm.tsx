import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";

import Button from "../../../fundamentalComponents/button/Button";
import { useAppSelector } from "../../../../store/hooks";

import useStyles from "./registrationForm.styles";
import useRegister from "../../../../hooks/apiHooks/useRegister";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { ITheme, IUserRegisterCommand } from "roottypes";
import FormikInput from "../../../fundamentalComponents/formikInputs/formikInput";

interface IRegistrationFormFormik {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IRegistrationFormProps {}
const Registration: React.FunctionComponent<IRegistrationFormProps> = (
  props: IRegistrationFormProps
) => {
  const withRegistration: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withRegistration
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.registration
  );

  const { register, loading } = useRegister();

  const formik: FormikProps<IRegistrationFormFormik> =
    useFormik<IRegistrationFormFormik>({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      },
      validationSchema: Yup.object().shape({
        firstName: Yup.string().required("Firstname is required"),
        lastName: Yup.string().required("Lastname is required"),
        email: Yup.string()
          .required("Email is required")
          .email("Please provide a valid email"),
        password: Yup.string()
          .required("Password is required")
          .min(6, "Password length should be at least 6 characters"),
        confirmPassword: Yup.string()
          .required("Password is required")
          .min(6, "Password length should be at least 6 characters")
          .test({
            test: (confirmPassword) =>
              confirmPassword === formik.values.password,
            message: "Password don't match",
          }),
      }),
      onSubmit: async (values: IRegistrationFormFormik) => {
        const command: IUserRegisterCommand = {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
          password: values.password,
        };
        await register(command);
      },
    });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();

  if (!withRegistration) return null;

  return (
    <form
      onSubmit={handleSubmit}
      className={styles.registrationContainer}
      data-cy="registrationForm"
    >
      <h2 className={styles.registrationTitle}>
        {getTranslatedText(staticText?.title)}:
      </h2>

      <div className={styles.firstNameAndLastName}>
        <FormikInput
          Icon={CgProfile}
          name="firstName"
          formik={formik}
          inputProps={{
            placeholder: getTranslatedText(staticText?.firstNamePlaceholder),
          }}
          inputDataCy="registrationFormFirstNameInput"
          inputErrorDataCy="registrationFormFirstNameInputError"
        />
        <FormikInput
          inputProps={{
            placeholder: getTranslatedText(staticText?.lastNamePlaceholder),
          }}
          Icon={CgProfile}
          name="lastName"
          formik={formik}
          inputDataCy="registrationFormLastNameInput"
          inputErrorDataCy="registrationFormLastNameInputError"
        />
      </div>
      <FormikInput
        Icon={AiOutlineMail}
        inputProps={{
          placeholder: getTranslatedText(staticText?.emailPlaceholder),
          type: "email",
        }}
        name="email"
        formik={formik}
        inputDataCy="registrationFormEmailInput"
        inputErrorDataCy="registrationFormEmailInputError"
      />
      <FormikInput
        Icon={RiLockPasswordLine}
        inputProps={{
          type: "password",
          placeholder: getTranslatedText(staticText?.passwordPlaceholder),
        }}
        name="password"
        formik={formik}
        inputDataCy="registrationFormPasswordInput"
        inputErrorDataCy="registrationFormPasswordInputError"
      />
      <FormikInput
        inputProps={{
          type: "password",
          placeholder: getTranslatedText(staticText?.passwordPlaceholder),
        }}
        Icon={AiOutlineMail}
        name="confirmPassword"
        formik={formik}
        inputDataCy="registrationFormConfirmPasswordInput"
        inputErrorDataCy="registrationFormConfirmPasswordInputError"
      />

      <Button disabled={loading} buttonDataCy="registrationFormSubmitButton">
        {getTranslatedText(staticText?.buttonText)}
      </Button>
    </form>
  );
};

export default Registration;
