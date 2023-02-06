import React from "react";
import { useTheme } from "react-jss";
import { CgProfile } from "react-icons/cg";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";
import axios, { AxiosResponse } from "axios";

import Input from "../input/Input";
import Button from "../button/Button";

import { Theme } from "../../config/theme";

import useStyles from "./profile.styles";
import { IUser, userSlice } from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { toast } from "react-toastify";
import ProfilePictureUpload from "../profilePictureUpload";

type ProfileFormik = {
  firstName: string;
  lastName: string;
};

interface IProfileForm {}
const Profile: React.FunctionComponent<IProfileForm> = (
  props: IProfileForm
) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState(false);

  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const styles = useStyles({ theme });

  const formik: FormikProps<ProfileFormik> = useFormik<ProfileFormik>({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Firstname is required"),
      lastName: Yup.string().required("Lastname is required"),
    }),
    onSubmit: (values: ProfileFormik) => {
      setLoading(true);
      axios
        .request<AxiosResponse<IUser>>({
          url: process.env.REACT_APP_BACKEND_URL + "/users",
          method: "PUT",
          data: {
            _id: user._id,
            firstName: values.firstName,
            lastName: values.lastName,
          },
        })
        .then((res) => {
          toast.success("Profile information updated");
          dispatch(userSlice.actions.setUser(res.data.data));
        })
        .finally(() => {
          setLoading(false);
        });
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

      <form onSubmit={handleSubmit}>
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

        <Button disabled={loading}>Update Profile Information</Button>

        <br />
      </form>
    </div>
  );
};

export default Profile;
