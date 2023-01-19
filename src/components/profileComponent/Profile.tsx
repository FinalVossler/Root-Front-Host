import React from "react";
import { useTheme } from "react-jss";
import { CgProfile } from "react-icons/cg";
import { FormikProps, useFormik } from "formik";
import * as Yup from "yup";

import Input from "../input/Input";
import Button from "../button/Button";

import { Theme } from "../../config/theme";

import useStyles from "./Profile.styles";
import { IUser, userSlice } from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import axios from "axios";
import { toast } from "react-toastify";
import SuccessResponseDto from "../../globalTypes/SuccessResponseDto";

type IProfileForm = {
  firstName: string;
  lastName: string;
};

interface IProfile {}
const Profile: React.FunctionComponent<IProfile> = (props: IProfile) => {
  const user: IUser = useAppSelector((state) => state.user.user);

  const [loading, setLoading] = React.useState(false);

  const theme: Theme = useTheme();
  const dispatch = useAppDispatch();
  const styles = useStyles({ theme });

  const formik: FormikProps<IProfileForm> = useFormik<IProfileForm>({
    initialValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
    validationSchema: Yup.object().shape({
      firstName: Yup.string().required("Firstname is required"),
      lastName: Yup.string().required("Lastname is required"),
    }),
    onSubmit: (values: IProfileForm) => {
      axios
        .request<SuccessResponseDto<IUser>>({
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

  const handleLogout = () => {
    dispatch(userSlice.actions.logout());
  };
  return (
    <form onSubmit={handleSubmit} className={styles.ProfileContainer}>
      <h2 className={styles.profileTitle}>Profile:</h2>
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

      <Button>Update Profile Information</Button>

      <br />

      <Button onClick={handleLogout}>Logout</Button>
    </form>
  );
};

export default Profile;
