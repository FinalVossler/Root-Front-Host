import React from "react";
import { useParams } from "react-router-dom";

import { MdPassword } from "react-icons/md";
import * as Yup from "yup";

import withWrapper from "../../hoc/wrapper";
import { useAppSelector } from "../../store/hooks";

import useStyles from "./ForgotPasswordChangePasswordPage.styles";
import { FormikProps, useFormik } from "formik";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import useForgotPasswordChangePassword from "../../hooks/apiHooks/useForgotPasswordChangePassword";
import Button from "../../components/fundamentalComponents/button";
import { ITheme, IUserForgotPasswordChangePasswordCommand } from "roottypes";
import FormikInput from "../../components/fundamentalComponents/formikInputs/formikInput";

interface IForgotPasswordChangePasswordFormik {
  newPassword: string;
  confirmNewPassword: string;
}

interface IForgotPasswordChangePasswordPageProps {}
const ForgotPasswordChangePasswordPage: React.FunctionComponent<
  IForgotPasswordChangePasswordPageProps
> = (props: IForgotPasswordChangePasswordPageProps) => {
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.changePassword
  );

  const { token: paramsToken } = useParams();
  const token = decodeURIComponent(paramsToken?.replaceAll("---", ".") || "");
  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { loading, forgotPasswordChangePassword } =
    useForgotPasswordChangePassword();

  const formik: FormikProps<IForgotPasswordChangePasswordFormik> =
    useFormik<IForgotPasswordChangePasswordFormik>({
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
      onSubmit: async (values: IForgotPasswordChangePasswordFormik) => {
        const command: IUserForgotPasswordChangePasswordCommand = {
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

        <FormikInput
          theme={theme}
          Icon={MdPassword}
          formik={formik}
          name="newPassword"
          inputProps={{
            type: "password",
            disabled: loading,
            placeholder: getTranslatedText(staticText?.newPassword),
          }}
        />
        <FormikInput
          theme={theme}
          Icon={MdPassword}
          formik={formik}
          name="confirmNewPassword"
          inputProps={{
            type: "password",
            disabled: loading,
            placeholder: getTranslatedText(staticText?.confirmPassword),
          }}
        />

        <Button theme={theme} disabled={loading}>
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
