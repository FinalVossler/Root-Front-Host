import React from "react";
import { CgProfile } from "react-icons/cg";
import { FormikProps, useFormik } from "formik";
import { BsArrowDownShort, BsArrowUpShort } from "react-icons/bs";
import * as Yup from "yup";

import Input from "../../../fundamentalComponents/input/Input";
import Button from "../../../fundamentalComponents/button/Button";

import { useAppSelector } from "../../../../store/hooks";
import ProfilePictureUpload from "../../profilePictureUpload";
import useUpdateUser from "../../../../hooks/apiHooks/useUpdateUser";
import useGetTranslatedText from "../../../../hooks/useGetTranslatedText";

import ChangePasswordForm from "../changePasswordForm";

import useStyles from "./profileForm.styles";
import {
  IRoleReadDto,
  ITheme,
  IUserReadDto,
  IUserUpdateCommand,
} from "roottypes";
import FormikCheckbox from "../../../fundamentalComponents/formikCheckbox";

type ProfileFormik = {
  firstName: string;
  lastName: string;
  email: string;
  hasMessagingEmailsActivated: boolean;
};

interface IProfileFormProps {}
const Profile: React.FunctionComponent<IProfileFormProps> = (
  props: IProfileFormProps
) => {
  const user: IUserReadDto = useAppSelector((state) => state.user.user);
  const theme: ITheme = useAppSelector(
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
      hasMessagingEmailsActivated: Boolean(user.hasMessagingEmailsActivated),
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
      const command: IUserUpdateCommand = {
        _id: user._id,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        hasMessagingEmailsActivated: values.hasMessagingEmailsActivated,
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
        hasMessagingEmailsActivated: Boolean(user.hasMessagingEmailsActivated),
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

        <FormikCheckbox
          name="hasMessagingEmailsActivated"
          formik={formik}
          label={getTranslatedText(staticText?.hasMessagingEmailsActivated)}
        />

        <span className={styles.userRoleContainer}>
          {getTranslatedText(staticText?.superRole)}:{" "}
          <span className={styles.role}>{user.superRole}</span>
        </span>

        <span className={styles.userRoleContainer}>
          {getTranslatedText(staticText?.role)}:{" "}
          <span className={styles.role}>
            {getTranslatedText((user.role as IRoleReadDto)?.name)}
          </span>
        </span>
        <br />

        <Button disabled={actualLoading}>
          {getTranslatedText(staticText?.updateProfileInformation)}
        </Button>

        <br />
      </form>

      <br />

      {changePasswordFormShowing && <ChangePasswordForm />}

      <Button
        disabled={actualLoading}
        onClick={() => setChangePasswordFormShowing(!changePasswordFormShowing)}
      >
        {getTranslatedText(changePasswordStaticText?.changePasswordTitle)}
        {changePasswordFormShowing && (
          <BsArrowDownShort
            className={styles.triggerShowChangePasswordFormIcon}
          />
        )}
        {!changePasswordFormShowing && (
          <BsArrowUpShort
            className={styles.triggerShowChangePasswordFormIcon}
          />
        )}
      </Button>
    </div>
  );
};

export default Profile;
