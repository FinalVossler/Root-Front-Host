import React from "react";

import RegistrationForm from "../../components/registrationForm";
import Login from "../../components/loginForm";

import { ITheme } from "../../config/theme";

import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import SendChangePasswordRequestForm from "../../components/sendChangePasswordRequestForm";

import useStyles from "./loginOrRegistrationPage.styles";
import IFile from "../../globalTypes/IFile";
import { useNavigate } from "react-router-dom";

enum ActiveForm {
  Register = "Register",
  Login = "Login",
  ForgotPassword = "ForgotPassword",
}

interface ILoginOrRegistrationPageProps {}
const LoginOrRegistrationPage: React.FunctionComponent<
  ILoginOrRegistrationPageProps
> = (props: ILoginOrRegistrationPageProps) => {
  //#region store
  const withRegistration: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withRegistration
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.profile
  );
  const theme: ITheme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const logo1: IFile | undefined = useAppSelector(
    (state) => state.websiteConfiguration.logo1
  );
  const websiteTitle = useAppSelector(
    (state) => state.websiteConfiguration.title
  );
  const websiteDescription = useAppSelector(
    (state) => state.websiteConfiguration.description
  );
  //#endregion store

  const [activeForm, setActiveForm] = React.useState<ActiveForm>(
    ActiveForm.Register
  );

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();
  const getTranslatedText = useGetTranslatedText();
  const navigate = useNavigate();

  const handleSwitchToForgotPasswordForm = () => {
    setActiveForm(ActiveForm.ForgotPassword);
  };

  React.useEffect(() => {
    if (isLoggedIn) {
      navigate("/profile");
    }
  }, [isLoggedIn]);

  return (
    <div className={styles.loginOrRegistrationPageContainer}>
      <div className={styles.left}>
        <h2 className={styles.welcome}>
          {websiteTitle || getTranslatedText(staticText?.welcome).toUpperCase()}
        </h2>
        <h3 className={styles.solutionDescription}>
          {getTranslatedText(websiteDescription) ||
            getTranslatedText(staticText?.solutionDescription)}
        </h3>
      </div>

      <div className={styles.right}>
        {logo1 && (
          <div
            style={{
              background: "url(" + logo1.url + ")" + " center center",
            }}
            className={styles.logo1}
          />
        )}

        {(activeForm === ActiveForm.Register || !activeForm) &&
          !isLoggedIn &&
          withRegistration && <RegistrationForm />}

        {(activeForm === ActiveForm.Login || !withRegistration) &&
          !isLoggedIn && <Login />}

        {activeForm === ActiveForm.ForgotPassword && !isLoggedIn && (
          <SendChangePasswordRequestForm />
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
                data-cy="loginButton"
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
    </div>
  );
};

export default React.memo(LoginOrRegistrationPage);
