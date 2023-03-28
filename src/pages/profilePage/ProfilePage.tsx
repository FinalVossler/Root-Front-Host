import React from "react";
import { BsFillGearFill } from "react-icons/bs";

import Registration from "../../components/registration";
import Login from "../../components/login";
import ProfileForm from "../../components/profileForm";

import { Theme } from "../../config/theme";

import withWrapper from "../../hoc/wrapper";

import useStyles from "./profilePage.styles";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import PostEditor from "../../components/editors/postEditor";
import UserPosts from "../../components/userPosts";
import { useAppSelector } from "../../store/hooks";
import { IUser } from "../../store/slices/userSlice";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import SendChangePasswordRequestForm from "../../components/sendChangePasswordRequestForm";

enum ActiveForm {
  Register = "Register",
  Login = "Login",
  ForgotPassword = "ForgotPassword",
}

interface IProfilePage {}
const ProfilePage: React.FunctionComponent<IProfilePage> = (
  props: IProfilePage
) => {
  const user: IUser = useAppSelector<IUser>((state) => state.user.user);
  const withRegistration: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withRegistration
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.profile
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );

  const [activeForm, setActiveForm] = React.useState<ActiveForm>(
    ActiveForm.Register
  );
  const [showProfileForm, setShowProfileForm] = React.useState(true);

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();
  const getTranslatedText = useGetTranslatedText();

  const handleSwitchToForgotPasswordForm = () => {
    setActiveForm(ActiveForm.ForgotPassword);
  };

  const handleTriggerShowProfileForm = () =>
    setShowProfileForm(!showProfileForm);

  return (
    <div className={styles.profilePageContainer}>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      {activeForm === ActiveForm.Register &&
        !isLoggedIn &&
        withRegistration && <Registration />}
      {(activeForm === ActiveForm.Login || !withRegistration) &&
        !isLoggedIn && <Login />}

      {activeForm === ActiveForm.ForgotPassword && !isLoggedIn && (
        <SendChangePasswordRequestForm />
      )}
      {isLoggedIn && (
        <div className={styles.connectedUserContainer}>
          <BsFillGearFill
            onClick={handleTriggerShowProfileForm}
            className={styles.configurationIcon}
            color={theme.primary}
          />
          {showProfileForm && (
            <div className={styles.profileAndPages}>
              <ProfileForm />
            </div>
          )}
          <div className={styles.postsAndEditor}>
            <PostEditor />
            <UserPosts user={user} />
          </div>
        </div>
      )}

      <br />

      {!isLoggedIn && withRegistration && (
        <div className={styles.switchFormContainer}>
          {activeForm === ActiveForm.Register && (
            <span>{getTranslatedText(staticText?.alreadyHaveAnAccount)}</span>
          )}
          {activeForm === ActiveForm.Login && (
            <span>{getTranslatedText(staticText?.dontHaveAnAccount)}</span>
          )}

          {activeForm !== ActiveForm.Register && withRegistration && (
            <button
              onClick={() => setActiveForm(ActiveForm.Register)}
              className={styles.switchFormButton}
            >
              -{getTranslatedText(staticText?.registerHere)}
            </button>
          )}

          {activeForm !== ActiveForm.Login && (
            <button
              onClick={() => setActiveForm(ActiveForm.Login)}
              className={styles.switchFormButton}
            >
              -{getTranslatedText(staticText?.loginHere)}
            </button>
          )}
        </div>
      )}
      {activeForm !== ActiveForm.ForgotPassword &&
        activeForm !== ActiveForm.Register &&
        !isLoggedIn && (
          <>
            <div />
            <button
              onClick={handleSwitchToForgotPasswordForm}
              className={styles.switchFormButton}
            >
              -{getTranslatedText(staticText?.forgotPassword)}
            </button>
          </>
        )}
      <br />
      <br />
    </div>
  );
};

export default withWrapper(ProfilePage, { withSideMenu: true });
