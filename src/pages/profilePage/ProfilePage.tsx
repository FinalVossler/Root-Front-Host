import React from "react";
import { useTheme } from "react-jss";
import { BsFillGearFill } from "react-icons/bs";

import Registration from "../../components/registration";
import Login from "../../components/login";
import ProfileForm from "../../components/profileForm";

import { Theme } from "../../config/theme";

import withWrapper from "../../hoc/wrapper";

import useStyles from "./profilePage.styles";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import PostEditor from "../../components/postEditor";
import UserPosts from "../../components/userPosts";
import { useAppSelector } from "../../store/hooks";
import { IUser, Role } from "../../store/slices/userSlice";
import Pages from "../../components/pages";
import WebsiteConfigurationEditor from "../../components/websiteConfigurationEditor";

enum ActiveForm {
  Register = "Register",
  Login = "Login",
}

interface IProfilePage {}
const ProfilePage: React.FunctionComponent<IProfilePage> = (
  props: IProfilePage
) => {
  const user: IUser = useAppSelector<IUser>((state) => state.user.user);

  const [activeForm, setActiveForm] = React.useState<ActiveForm>(
    ActiveForm.Register
  );
  const [showConfiguration, setShowConfiguration] = React.useState(true);

  const theme: Theme = useTheme();
  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();

  const handleSwitchForm = () => {
    setActiveForm(
      activeForm === ActiveForm.Register
        ? ActiveForm.Login
        : ActiveForm.Register
    );
  };

  const handleTriggerShowConfiguration = () =>
    setShowConfiguration(!showConfiguration);

  return (
    <div className={styles.profilePageContainer}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {activeForm === ActiveForm.Register && !isLoggedIn && <Registration />}
      {activeForm === ActiveForm.Login && !isLoggedIn && <Login />}
      {isLoggedIn && (
        <div className={styles.connectedUserContainer}>
          <BsFillGearFill
            onClick={handleTriggerShowConfiguration}
            className={styles.configurationIcon}
            color={theme.primary}
          />
          {showConfiguration && (
            <div className={styles.profileAndPages}>
              <ProfileForm />
              {user.role === Role.Admin && <Pages />}
              {user.role === Role.Admin && <WebsiteConfigurationEditor />}
            </div>
          )}
          <div className={styles.postsAndEditor}>
            <PostEditor />
            <UserPosts user={user} />
          </div>
        </div>
      )}

      <br />

      {!isLoggedIn && (
        <div className={styles.switchFormContainer}>
          <span>
            {activeForm === ActiveForm.Register
              ? "Already have an account?"
              : "Don't have an account?"}
          </span>
          <button
            onClick={handleSwitchForm}
            className={styles.switchFormButton}
          >
            {activeForm === ActiveForm.Register
              ? "Login here"
              : "Register here"}
          </button>
        </div>
      )}

      <br />
      <br />
    </div>
  );
};

export default withWrapper(ProfilePage);
