import React from "react";
import { useTheme } from "react-jss";
import { AiOutlineMail } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import { RiLockPasswordLine } from "react-icons/ri";
import * as Yup from "yup";
import { AxiosResponse } from "axios";
import { toast } from "react-toastify";

import Input from "../input/Input";
import Button from "../button/Button";
import useAxios from "../../hooks/useAxios";

import { Theme } from "../../config/theme";

import { IUser, userSlice } from "../../store/slices/userSlice";
import { useAppDispatch } from "../../store/hooks";
import UserLoginCommand from "../../globalTypes/commands/UserLoginCommand";

import useStyles from "./login.styles";

type ILoginForm = {
  email: string;
  password: string;
};

interface ILogin {}
const Registration: React.FunctionComponent<ILogin> = (props: ILogin) => {
  const [loading, setLoading] = React.useState(false);
  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const axios = useAxios();

  const formik: FormikProps<ILoginForm> = useFormik<ILoginForm>({
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
    onSubmit: (values: ILoginForm) => {
      setLoading(true);

      const command: UserLoginCommand = {
        email: values.email,
        password: values.password,
      };
      axios
        .request<
          AxiosResponse<{ expiresIn: string; token: string; user: IUser }>
        >({
          url: process.env.REACT_APP_BACKEND_URL + "/users/login",
          method: "POST",
          data: command,
        })
        .then((res) => {
          dispatch(userSlice.actions.setUserAndTokenInformation(res.data.data));
          toast.success("Welcome back :)");
        });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const styles = useStyles({ theme });
  return (
    <form onSubmit={handleSubmit} className={styles.loginContainer}>
      <h2 className={styles.loginTitle}>Login:</h2>
      <Input
        placeholder="Enter your email"
        Icon={AiOutlineMail}
        inputProps={{
          type: "email",
        }}
        name="email"
        formik={formik}
      />
      <Input
        placeholder="Enter your password"
        Icon={RiLockPasswordLine}
        inputProps={{
          type: "password",
        }}
        name="password"
        formik={formik}
      />

      <Button>Login</Button>
    </form>
  );
};

export default Registration;
