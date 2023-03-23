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

enum ActiveForm {
  Register = "Register",
  Login = "Login",
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
  const [showConfiguration, setShowConfiguration] = React.useState(true);

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();
  const getTranslatedText = useGetTranslatedText();

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

      {activeForm === ActiveForm.Register &&
        !isLoggedIn &&
        withRegistration && <Registration />}
      {(activeForm === ActiveForm.Login || !withRegistration) &&
        !isLoggedIn && <Login />}
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
          <span>
            {activeForm === ActiveForm.Register
              ? getTranslatedText(staticText?.alreadyHaveAnAccount)
              : getTranslatedText(staticText?.dontHaveAnAccount)}
          </span>
          <button
            onClick={handleSwitchForm}
            className={styles.switchFormButton}
          >
            {activeForm === ActiveForm.Register && withRegistration
              ? getTranslatedText(staticText?.loginHere)
              : getTranslatedText(staticText?.registerHere)}
          </button>
        </div>
      )}

      <br />
      <br />
    </div>
  );
};

export default withWrapper(ProfilePage, { withSideMenu: true });
