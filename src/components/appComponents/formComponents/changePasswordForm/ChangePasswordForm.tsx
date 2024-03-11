import React from "react";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";

import Input from "../../../fundamentalComponents/inputs/input/Input";
import Button from "../../../fundamentalComponents/button/Button";

import { useAppSelector } from "../../../../store/hooks";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";

import useStyles from "./changePasswordForm.styles";
import useChangePassword from "../../../../hooks/apiHooks/useChangePassword";
import { MdPassword } from "react-icons/md";
import { ITheme, IUserChangePasswordCommand, IUserReadDto } from "roottypes";
import FormikInput from "../../../fundamentalComponents/formikInputs/formikInput";

type ChangePasswordFormik = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

interface IChangePasswordFormProps {}
const ChangePasswordForm: React.FunctionComponent<IChangePasswordFormProps> = (
  props: IChangePasswordFormProps
) => {
  const user: IUserReadDto = useAppSelector((state) => state.user.user);
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.changePassword
  );

  const styles = useStyles({ theme });
  const getTranslatedText = useGetTranslatedText();
  const { loading, changePassword } = useChangePassword();

  const formik: FormikProps<ChangePasswordFormik> =
    useFormik<ChangePasswordFormik>({
      initialValues: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
      validationSchema: Yup.object().shape({
        oldPassword: Yup.string().required(
          getTranslatedText(staticText?.required)
        ),
        newPassword: Yup.string().required(
          getTranslatedText(staticText?.required)
        ),
        confirmNewPassword: Yup.string()
          .required(getTranslatedText(staticText?.required))
          .test(
            "testMatchingPasswords",
            getTranslatedText(staticText?.passwordsMustMatch),
            (newPassword) => newPassword === formik.values.newPassword
          ),
      }),
      onSubmit: async (values: ChangePasswordFormik) => {
        const command: IUserChangePasswordCommand = {
          oldPassword: values.oldPassword,
          newPassword: values.newPassword,
        };

        await changePassword(command);
      },
    });

  React.useEffect(() => {
    formik.resetForm({
      values: {
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      },
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const actualLoading = loading;

  return (
    <div className={styles.changePasswordFormcontainer}>
      <h2 className={styles.changePasswordFormTitle}>
        {getTranslatedText(staticText?.changePasswordTitle)}:
      </h2>

      <form className={styles.changePasswordForm} onSubmit={handleSubmit}>
        <FormikInput
          theme={theme}
          Icon={MdPassword}
          name="oldPassword"
          formik={formik}
          inputProps={{
            placeholder: getTranslatedText(staticText?.oldPassword),
            disabled: actualLoading,
            type: "password",
          }}
        />
        <FormikInput
          theme={theme}
          Icon={MdPassword}
          inputProps={{
            placeholder: getTranslatedText(staticText?.newPassword),
            disabled: actualLoading,
            type: "password",
          }}
          name="newPassword"
          formik={formik}
        />

        <FormikInput
          theme={theme}
          Icon={MdPassword}
          inputProps={{
            placeholder: getTranslatedText(staticText?.confirmPassword),
            disabled: actualLoading,
            type: "password",
          }}
          name="confirmNewPassword"
          formik={formik}
        />

        <Button theme={theme} disabled={actualLoading}>
          {getTranslatedText(staticText?.send)}
        </Button>

        <br />
      </form>
    </div>
  );
};

export default ChangePasswordForm;
