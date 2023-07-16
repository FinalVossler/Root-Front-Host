import React from "react";
import { useParams } from "react-router-dom";

import { Theme } from "../../config/theme";
import { MdPassword } from "react-icons/md";
import * as Yup from "yup";

import withWrapper from "../../hoc/wrapper";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./ForgotPasswordChangePasswordPage.styles";
import { FormikProps, useFormik } from "formik";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useForgotPasswordChangePassword, {
  UserForgotPasswordChangePasswordCommand,
} from "../../hooks/apiHooks/useForgotPasswordChangePassword";
import Input from "../../components/input";
import Button from "../../components/button";

interface IForgotPasswordChangePasswordForm {
  newPassword: string;
  confirmNewPassword: string;
}

interface IForgotPasswordChangePasswordPage {}
const ForgotPasswordChangePasswordPage: React.FunctionComponent<IForgotPasswordChangePasswordPage> =
  (props: IForgotPasswordChangePasswordPage) => {
    const theme: Theme = useAppSelector(
      (state) => state.websiteConfiguration.theme
    );
    const staticText = useAppSelector(
      (state) => state.websiteConfiguration.staticText?.changePassword
    );

    const { token } = useParams();
    const styles = useStyles({ theme });
    const getTranslatedText = useGetTranslatedText();
    const { loading, forgotPasswordChangePassword } =
      useForgotPasswordChangePassword();

    const formik: FormikProps<IForgotPasswordChangePasswordForm> =
      useFormik<IForgotPasswordChangePasswordForm>({
        initialValues: {
          newPassword: "",
          confirmNewPassword: "",
        },
        validationSchema: Yup.object().shape({
          confirmNewPassword: Yup.string()
            .required(getTranslatedText(staticText?.required))
            .test(
              "testMatchingPasswords",
              getTranslatedText(staticText?.passwordsMustMatch),
              (newPassword) => newPassword === formik.values.newPassword
            ),
          newPassword: Yup.string().required(
            getTranslatedText(staticText?.required)
          ),
        }),
        onSubmit: async (values: IForgotPasswordChangePasswordForm) => {
          const command: UserForgotPasswordChangePasswordCommand = {
            newPassword: values.newPassword,
            token: token || "",
          };

          await forgotPasswordChangePassword(command);
        },
      });

    return (
      <div className={styles.forgotPasswordChangePasswordPageContainer}>
        <form
          className={styles.changePasswordForm}
          onSubmit={formik.handleSubmit}
        >
          <h2 className={styles.changePasswordTitle}>
            {getTranslatedText(staticText?.changePasswordTitle)}:
          </h2>

          <Input
            Icon={MdPassword}
            formik={formik}
            name="newPassword"
            inputProps={{
              type: "password",
              disabled: loading,
              placeholder: getTranslatedText(staticText?.newPassword),
            }}
          />
          <Input
            Icon={MdPassword}
            formik={formik}
            name="confirmNewPassword"
            inputProps={{
              type: "password",
              disabled: loading,
              placeholder: getTranslatedText(staticText?.confirmPassword),
            }}
          />

          <Button disabled={loading}>
            {getTranslatedText(staticText?.send)}
          </Button>
        </form>
      </div>
    );
  };

export default withWrapper(React.memo(ForgotPasswordChangePasswordPage), {
  withFooter: true,
  withSideMenu: true,
});
