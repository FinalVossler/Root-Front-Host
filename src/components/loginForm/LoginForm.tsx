import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";

import Input from "../input/Input";
import Button from "../button/Button";

import { Theme } from "../../config/theme";

import { useAppSelector } from "../../store/hooks";

import useStyles from "./loginForm.styles";
import useLogin, { UserLoginCommand } from "../../hooks/apiHooks/useLogin";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import { useNavigate } from "react-router-dom";

interface ILoginFormForm {
  email: string;
  password: string;
}

interface ILoginForm {}
const LoginForm: React.FunctionComponent<ILoginForm> = (props: ILoginForm) => {
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText
  );
  const { login, loading } = useLogin();
  const getTranslatedText = useGetTranslatedText();
  const navigate = useNavigate();

  const formik: FormikProps<ILoginFormForm> = useFormik<ILoginFormForm>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Please provide a valid email"),
      password: Yup.string()
        .required("Password is required")
        .min(6, "Password length should be at least 6 characters"),
    }),
    onSubmit: async (values: ILoginFormForm) => {
      const command: UserLoginCommand = {
        email: values.email,
        password: values.password,
      };

      await login(command, () => {
        navigate('/profile')
      });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const styles = useStyles({ theme });
  return (
    <>
      <form onSubmit={handleSubmit} className={styles.loginFormContainer}>
        <h2 className={styles.loginTitle}>
          {getTranslatedText(staticText?.login.title)}
        </h2>
        <Input
          Icon={AiOutlineMail}
          inputProps={{
            type: "email",
            placeholder: getTranslatedText(staticText?.login.emailPlaceholder),
          }}
          name="email"
          formik={formik}
        />
        <Input
          Icon={RiLockPasswordLine}
          inputProps={{
            type: "password",
            placeholder: getTranslatedText(
              staticText?.login.passwordPlaceholder
            ),
          }}
          name="password"
          formik={formik}
        />

        <Button disabled={loading}>
          {getTranslatedText(staticText?.login.title)}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
