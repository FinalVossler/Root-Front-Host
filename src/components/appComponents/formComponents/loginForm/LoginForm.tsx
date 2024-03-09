import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";

import Input from "../../../fundamentalComponents/input/Input";
import Button from "../../../fundamentalComponents/button/Button";

import { useAppSelector } from "../../../../store/hooks";

import useStyles from "./loginForm.styles";
import useLogin from "../../../../hooks/apiHooks/useLogin";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import { useNavigate } from "react-router-dom";
import { ITheme, IUserLoginCommand } from "roottypes";

interface ILoginFormFormik {
  email: string;
  password: string;
}

interface ILoginFormProps {}
const LoginForm: React.FunctionComponent<ILoginFormProps> = (
  props: ILoginFormProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText
  );
  const { login, loading } = useLogin();
  const getTranslatedText = useGetTranslatedText();
  const navigate = useNavigate();

  const formik: FormikProps<ILoginFormFormik> = useFormik<ILoginFormFormik>({
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
    onSubmit: async (values: ILoginFormFormik) => {
      const command: IUserLoginCommand = {
        email: values.email,
        password: values.password,
      };

      await login(command, () => {
        navigate("/profile");
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
      <form
        onSubmit={handleSubmit}
        className={styles.loginFormContainer}
        data-cy="loginForm"
      >
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
          inputDataCy="loginFormEmailInput"
          inputErrorDataCy="loginFormEmailInputError"
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
          inputDataCy="loginFormPasswordInput"
          inputErrorDataCy="loginFormPasswordInputError"
        />

        <Button disabled={loading} buttonDataCy="loginFormSubmitButton">
          {getTranslatedText(staticText?.login.title)}
        </Button>
      </form>
    </>
  );
};

export default LoginForm;
