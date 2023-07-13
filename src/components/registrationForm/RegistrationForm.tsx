import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";

import Input from "../input/Input";
import Button from "../button/Button";
import { useAppSelector } from "../../store/hooks";

import { Theme } from "../../config/theme";

import useStyles from "./registrationForm.styles";
import useRegister, {
  UserRegisterCommand,
} from "../../hooks/apiHooks/useRegister";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

interface IRegistrationFormForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IRegistrationForm {}
const Registration: React.FunctionComponent<IRegistrationForm> = (
  props: IRegistrationForm
) => {
  const withRegistration: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withRegistration
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.registration
  );

  const { register, loading } = useRegister();

  const formik: FormikProps<IRegistrationFormForm> = useFormik<IRegistrationFormForm>({
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
          test: (confirmPassword) => confirmPassword === formik.values.password,
          message: "Password don't match",
        }),
    }),
    onSubmit: async (values: IRegistrationFormForm) => {
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
    <form onSubmit={handleSubmit} className={styles.registrationContainer}>
      <h2 className={styles.registrationTitle}>
        {getTranslatedText(staticText?.title)}:
      </h2>
      <Input
        Icon={CgProfile}
        name="firstName"
        formik={formik}
        inputProps={{
          placeholder: getTranslatedText(staticText?.firstNamePlaceholder),
        }}
      />
      <Input
        inputProps={{
          placeholder: getTranslatedText(staticText?.lastNamePlaceholder),
        }}
        Icon={CgProfile}
        name="lastName"
        formik={formik}
      />
      <Input
        Icon={AiOutlineMail}
        inputProps={{
          placeholder: getTranslatedText(staticText?.emailPlaceholder),
          type: "email",
        }}
        name="email"
        formik={formik}
      />
      <Input
        Icon={RiLockPasswordLine}
        inputProps={{
          type: "password",
          placeholder: getTranslatedText(staticText?.passwordPlaceholder),
        }}
        name="password"
        formik={formik}
      />
      <Input
        inputProps={{
          type: "password",
          placeholder: getTranslatedText(staticText?.passwordPlaceholder),
        }}
        Icon={AiOutlineMail}
        name="confirmPassword"
        formik={formik}
      />

      <Button disabled={loading}>
        {getTranslatedText(staticText?.buttonText)}
      </Button>
    </form>
  );
};

export default Registration;
