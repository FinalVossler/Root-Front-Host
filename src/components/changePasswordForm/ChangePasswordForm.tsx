import React from "react";
import { CgProfile } from "react-icons/cg";
import { FormikProps, useFormik, yupToFormErrors } from "formik";
import * as Yup from "yup";

import Input from "../input/Input";
import Button from "../button/Button";

import { Theme } from "../../config/theme";

import { IUser } from "../../store/slices/userSlice";
import { useAppSelector } from "../../store/hooks";
import ProfilePictureUpload from "../profilePictureUpload";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

import useStyles from "./changePasswordForm.styles";
import useChangePassword, {
  UserChangePasswordCommand,
} from "../../hooks/apiHooks/useChangePassword";
import { MdPassword } from "react-icons/md";

type ChangePasswordFormik = {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
};

interface IChangePasswordForm {}
const ChangePasswordForm: React.FunctionComponent<IChangePasswordForm> = (
  props: IChangePasswordForm
) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const theme: Theme = useAppSelector(
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
        const command: UserChangePasswordCommand = {
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
        <Input
          Icon={MdPassword}
          name="oldPassword"
          formik={formik}
          inputProps={{
            placeholder: getTranslatedText(staticText?.oldPassword),
            disabled: actualLoading,
            type: "password",
          }}
        />
        <Input
          Icon={MdPassword}
          inputProps={{
            placeholder: getTranslatedText(staticText?.newPassword),
            disabled: actualLoading,
            type: "password",
          }}
          name="newPassword"
          formik={formik}
        />

        <Input
          Icon={MdPassword}
          inputProps={{
            placeholder: getTranslatedText(staticText?.confirmPassword),
            disabled: actualLoading,
            type: "password",
          }}
          name="confirmNewPassword"
          formik={formik}
        />

        <Button disabled={actualLoading}>
          {getTranslatedText(staticText?.send)}
        </Button>

        <br />
      </form>
    </div>
  );
};

export default ChangePasswordForm;
