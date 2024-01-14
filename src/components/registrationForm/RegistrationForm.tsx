import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";

import Input from "../input/Input";
import Button from "../button/Button";
import { useAppSelector } from "../../store/hooks";

import { ITheme } from "../../config/theme";

import useStyles from "./registrationForm.styles";
import useRegister, {
  UserRegisterCommand,
} from "../../hooks/apiHooks/useRegister";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

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
        const command: UserRegisterCommand = {
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
        <Input
          Icon={CgProfile}
          name="firstName"
          formik={formik}
          inputProps={{
            placeholder: getTranslatedText(staticText?.firstNamePlaceholder),
          }}
          inputDataCy="registrationFormFirstNameInput"
          inputErrorDataCy="registrationFormFirstNameInputError"
        />
        <Input
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
      <Input
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
      <Input
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
      <Input
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
