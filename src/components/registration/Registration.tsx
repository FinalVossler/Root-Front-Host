import React from "react";
import { CgProfile } from "react-icons/cg";
import { AiOutlineMail } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import { RiLockPasswordLine } from "react-icons/ri";
import { AxiosResponse } from "axios";
import * as Yup from "yup";

import Input from "../input/Input";
import Button from "../button/Button";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { IUser, userSlice } from "../../store/slices/userSlice";
import useAxios from "../../hooks/useAxios";

import { Theme } from "../../config/theme";

import useStyles from "./registration.styles";
import UserRegisterCommand from "../../globalTypes/commands/UserRegisterCommand";

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

  const [loading, setLoading] = React.useState(false);

  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
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
      const command: UserRegisterCommand = {
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        password: values.password,
      };

      axios
        .request<
          AxiosResponse<{ token: string; expiresIn: string; user: IUser }>
        >({
          url: process.env.REACT_APP_BACKEND_URL + "/users/register",
          method: "POST",
          data: command,
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

      <Button>Register</Button>
    </form>
  );
};

export default Registration;
