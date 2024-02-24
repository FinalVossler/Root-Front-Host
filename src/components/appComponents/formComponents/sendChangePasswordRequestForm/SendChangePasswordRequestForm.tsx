import React from "react";
import { AiOutlineMail } from "react-icons/ai";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";

import Input from "../../../fundamentalComponents/input/Input";
import Button from "../../../fundamentalComponents/button/Button";

import { ITheme } from "../../../../config/theme";

import { useAppSelector } from "../../../../store/hooks";

import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";
import useSendChangePasswordRequest from "../../../../hooks/apiHooks/useSendChangePasswordRequest";

import useStyles from "./sendChangePasswordRequestForm.styles";

interface ISendChangePasswordRequestFormik {
  email: string;
}

interface ISendChangePasswordRequestProps {}
const Registration: React.FunctionComponent<ISendChangePasswordRequestProps> = (
  props: ISendChangePasswordRequestProps
) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.changePassword
  );

  const getTranslatedText = useGetTranslatedText();
  const { loading, sendChangePasswordRequest } = useSendChangePasswordRequest();

  const formik: FormikProps<ISendChangePasswordRequestFormik> =
    useFormik<ISendChangePasswordRequestFormik>({
      initialValues: {
        email: "",
      },
      validationSchema: Yup.object().shape({
        email: Yup.string().required("Email is required"),
      }),
      onSubmit: async (values: ISendChangePasswordRequestFormik) => {
        const email: string = values.email;
        await sendChangePasswordRequest(email);
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
        className={styles.SendChangePasswordRequestContainer}
      >
        <h2 className={styles.sendChangePasswordRequestTitle}>
          {getTranslatedText(staticText?.sendChangePasswordRequestTitle)}
        </h2>

        <Input
          Icon={AiOutlineMail}
          inputProps={{
            type: "email",
            placeholder: getTranslatedText(staticText?.email),
          }}
          name="email"
          formik={formik}
        />

        <Button
          disabled={loading}
          style={{
            fontSize: 13,
          }}
        >
          {getTranslatedText(staticText?.sendChangePasswordRequest)}
        </Button>
      </form>
    </>
  );
};

export default Registration;
