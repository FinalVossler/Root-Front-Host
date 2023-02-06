import React from "react";
import { useTheme } from "react-jss";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import { RiLockPasswordLine } from "react-icons/ri";
import { AxiosResponse } from "axios";
import * as Yup from "yup";

import Input from "../input/Input";
import Button from "../button/Button";
import { useAppDispatch } from "../../store/hooks";
import { IUser, userSlice } from "../../store/slices/userSlice";
import useAxios from "../../hooks/useAxios";

import { Theme } from "../../config/theme";

import useStyles from "./registration.styles";

type IRegistrationForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

interface IRegistration {}
const Registration: React.FunctionComponent<IRegistration> = (
  props: IRegistration
) => {
  const [loading, setLoading] = React.useState(false);

  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const axios = useAxios();

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
    onSubmit: (values: IRegistrationForm) => {
      setLoading(true);
      axios
        .request<
          AxiosResponse<{ token: string; expiresIn: string; user: IUser }>
        >({
          url: process.env.REACT_APP_BACKEND_URL + "/users/register",
          method: "POST",
          data: values,
        })
        .then((res) => {
          const { user, token, expiresIn } = res.data.data;
          dispatch(
            dispatch(
              userSlice.actions.setUserAndTokenInformation({
                user,
                token,
                expiresIn,
              })
            )
          );
        });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const styles = useStyles({ theme });
  return (
    <form onSubmit={handleSubmit} className={styles.registrationContainer}>
      <h2 className={styles.registrationTitle}>Registration:</h2>
      <Input
        placeholder="Enter your first name"
        Icon={CgProfile}
        name="firstName"
        formik={formik}
      />
      <Input
        placeholder="Enter your last name"
        Icon={CgProfile}
        inputProps={{}}
        name="lastName"
        formik={formik}
      />
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
      <Input
        inputProps={{
          type: "password",
        }}
        placeholder="Confirm your password"
        Icon={AiOutlineMail}
        name="confirmPassword"
        formik={formik}
      />

      <Button>Register</Button>
    </form>
  );
};

export default Registration;
