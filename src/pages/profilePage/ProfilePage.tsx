import React from "react";
import { useTheme } from "react-jss";

import Registration from "../../components/registration";
import Login from "../../components/login";
import ProfileComponent from "../../components/profileComponent";
import Banner from "../../components/banner";

import { Theme } from "../../config/theme";

import withWrapper from "../../hoc/wrapper";

import useStyles from "./profilePage.styles";
import useIsLoggedIn from "../../hooks/useIsLoggedIn";

enum ActiveForm {
  Register = "Register",
  Login = "Login",
}

interface IProfilePage {}
const ProfilePage: React.FunctionComponent<IProfilePage> = (
  props: IProfilePage
) => {
  const [activeForm, setActiveForm] = React.useState<ActiveForm>(
    ActiveForm.Register
  );

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

  return (
    <div className={styles.profilePageContainer}>
      <Banner />

      <br />
      <br />

      {activeForm === ActiveForm.Register && !isLoggedIn && <Registration />}
      {activeForm === ActiveForm.Login && !isLoggedIn && <Login />}
      {isLoggedIn && <ProfileComponent />}

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
