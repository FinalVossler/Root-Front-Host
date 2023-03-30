import React from "react";
import { CgProfile } from "react-icons/cg";
import { FormikProps, useFormik } from "formik";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import * as Yup from "yup";

import Input from "../input/Input";
import Button from "../button/Button";

import { Theme } from "../../config/theme";

import { IUser } from "../../store/slices/userSlice";
import { useAppSelector } from "../../store/hooks";
import ProfilePictureUpload from "../profilePictureUpload";
import useUpdateUser, {
  UserUpdateCommand,
} from "../../hooks/apiHooks/useUpdateUser";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

import ChangePasswordForm from "../changePasswordForm";

import useStyles from "./profileForm.styles";

type ProfileFormik = {
  firstName: string;
  lastName: string;
  email: string;
};

interface IProfileForm {}
const Profile: React.FunctionComponent<IProfileForm> = (
  props: IProfileForm
) => {
  const user: IUser = useAppSelector((state) => state.user.user);
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.profile
  );
  const changePasswordStaticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.changePassword
  );

  const [changePasswordFormShowing, setChangePasswordFormShowing] =
    React.useState<boolean>(false);

  const styles = useStyles({ theme });
  const { updateUser, loading } = useUpdateUser();
  const getTranslatedText = useGetTranslatedText();

  const formik: FormikProps<ProfileFormik> = useFormik<ProfileFormik>({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(
        getTranslatedText(staticText?.firstNameIsRequired)
      ),
      lastName: Yup.string().required(
        getTranslatedText(staticText?.lastNameIsRequired)
      ),
      email: Yup.string()
        .email(getTranslatedText(staticText?.mustBeOfTypeEmail))
        .required(getTranslatedText(staticText?.lastNameIsRequired)),
    }),
    onSubmit: async (values: ProfileFormik) => {
      const command: UserUpdateCommand = {
        _id: user._id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
      };

      await updateUser(command);
    },
  });

  React.useEffect(() => {
    formik.resetForm({
      values: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  const actualLoading = loading;

  return (
    <div className={styles.profileFormContainer}>
      <h2 className={styles.profileFormTitle}>
        {getTranslatedText(staticText?.title)}:
      </h2>

      <ProfilePictureUpload />

      <br />

      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <Input
          Icon={CgProfile}
          name="firstName"
          formik={formik}
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterFirstName),
            disabled: actualLoading,
          }}
        />
        <Input
          Icon={CgProfile}
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterLastName),
            disabled: actualLoading,
          }}
          name="lastName"
          formik={formik}
        />
        <Input
          Icon={CgProfile}
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterEmail),
            disabled: actualLoading,
            type: "email",
          }}
          name="email"
          formik={formik}
        />

        <span className={styles.userRoleContainer}>
          {getTranslatedText(staticText?.superRole)}:{" "}
          <span className={styles.role}>{user.superRole}</span>
        </span>
        <br />

        <Button disabled={actualLoading}>
          {getTranslatedText(staticText?.updateProfileInformation)}
        </Button>

        <br />
      </form>

      <br />

      <Button
        disabled={actualLoading}
        onClick={() => setChangePasswordFormShowing(!changePasswordFormShowing)}
      >
        {getTranslatedText(changePasswordStaticText?.changePasswordTitle)}
        {!changePasswordFormShowing && (
          <BsArrowDownShort
            className={styles.triggerShowChangePasswordFormIcon}
          />
        )}
        {changePasswordFormShowing && (
          <BsArrowUpShort
            className={styles.triggerShowChangePasswordFormIcon}
          />
        )}
      </Button>

      {changePasswordFormShowing && <ChangePasswordForm />}
    </div>
  );
};

export default Profile;
