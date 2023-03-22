import React from "react";
import { CgProfile } from "react-icons/cg";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";

import Input from "../input/Input";
import Button from "../button/Button";

import { Theme } from "../../config/theme";

import useStyles from "./profile.styles";
import { IUser } from "../../store/slices/userSlice";
import { useAppSelector } from "../../store/hooks";
import ProfilePictureUpload from "../profilePictureUpload";
import useUpdateUser, {
  UserUpdateCommand,
} from "../../hooks/apiHooks/useUpdateUser";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";

type ProfileFormik = {
  firstName: string;
  lastName: string;
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

  const styles = useStyles({ theme });
  const { updateUser, loading } = useUpdateUser();
  const getTranslatedText = useGetTranslatedText();

  const formik: FormikProps<ProfileFormik> = useFormik<ProfileFormik>({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(
        getTranslatedText(staticText?.firstNameIsRequired)
      ),
      lastName: Yup.string().required(
        getTranslatedText(staticText?.lastNameIsRequired)
      ),
    }),
    onSubmit: async (values: ProfileFormik) => {
      const command: UserUpdateCommand = {
        _id: user._id,
        firstName: values.firstName,
        lastName: values.lastName,
      };

      await updateUser(command);
    },
  });

  React.useEffect(() => {
    formik.resetForm({
      values: {
        firstName: user.firstName,
        lastName: user.lastName,
      },
    });
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    formik.handleSubmit();
  };

  return (
    <div className={styles.profileFormContainer}>
      <h2 className={styles.profileFormTitle}>Profile:</h2>

      <ProfilePictureUpload />

      <br />

      <form className={styles.profileForm} onSubmit={handleSubmit}>
        <Input
          Icon={CgProfile}
          name="firstName"
          formik={formik}
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterYourFirstName),
          }}
        />
        <Input
          Icon={CgProfile}
          inputProps={{
            placeholder: getTranslatedText(staticText?.enterYourLastName),
          }}
          name="lastName"
          formik={formik}
        />

        <span className={styles.userRole}>
          Role: <span className={styles.actualRole}>{user.role}</span>
        </span>
        <br />

        <Button disabled={loading}>
          {getTranslatedText(staticText?.updateProfileInformation)}
        </Button>

        <br />
      </form>
    </div>
  );
};

export default Profile;
