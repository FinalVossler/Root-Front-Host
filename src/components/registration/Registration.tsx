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

import useStyles from "./registration.styles";
import useRegister, {
  UserRegisterCommand,
} from "../../hooks/apiHooks/useRegister";

interface IRegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IRegistration {}
const Registration: React.FunctionComponent<IRegistration> = (
  props: IRegistration
) => {
  const withRegistration: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withRegistration
  );

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const { register, loading } = useRegister();

  const formik: FormikProps<IRegistrationForm> = useFormik<IRegistrationForm>({
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
    onSubmit: async (values: IRegistrationForm) => {
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

  if (!withRegistration) return null;

  return (
    <form onSubmit={handleSubmit} className={styles.registrationContainer}>
      <h2 className={styles.registrationTitle}>Registration:</h2>
      <Input
        Icon={CgProfile}
        name="firstName"
        formik={formik}
        inputProps={{
          placeholder: "Enter your first name",
        }}
      />
      <Input
        inputProps={{
          placeholder: "Enter your last name",
        }}
        Icon={CgProfile}
        name="lastName"
        formik={formik}
      />
      <Input
        Icon={AiOutlineMail}
        inputProps={{
          placeholder: "Enter your email",
          type: "email",
        }}
        name="email"
        formik={formik}
      />
      <Input
        Icon={RiLockPasswordLine}
        inputProps={{
          type: "password",
          placeholder: "Enter your password",
        }}
        name="password"
        formik={formik}
      />
      <Input
        inputProps={{
          type: "password",
          placeholder: "Confirm your password",
        }}
        Icon={AiOutlineMail}
        name="confirmPassword"
        formik={formik}
      />

      <Button disabled={loading}>Register</Button>
    </form>
  );
};

export default Registration;
