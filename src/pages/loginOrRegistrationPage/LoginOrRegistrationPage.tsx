import React from "react";

import RegistrationForm from "../../components/registrationForm";
import Login from "../../components/loginForm";

import { Theme } from "../../config/theme";

import useIsLoggedIn from "../../hooks/useIsLoggedIn";
import { useAppSelector } from "../../store/hooks";
import useGetTranslatedText from "../../hooks/useGetTranslatedText";
import SendChangePasswordRequestForm from "../../components/sendChangePasswordRequestForm";

import useStyles from "./loginOrRegistrationPage.styles";
import IFile from "../../globalTypes/IFile";

enum ActiveForm {
  Register = "Register",
  Login = "Login",
  ForgotPassword = "ForgotPassword",
}

interface ILoginOrRegistrationPage {}
const LoginOrRegistrationPage: React.FunctionComponent<ILoginOrRegistrationPage> = (
  props: ILoginOrRegistrationPage
) => {
  //#region store
  const withRegistration: boolean | undefined = useAppSelector(
    (state) => state.websiteConfiguration.withRegistration
  );
  const staticText = useAppSelector(
    (state) => state.websiteConfiguration.staticText?.profile
  );
  const theme: Theme = useAppSelector(
    (state) => state.websiteConfiguration.theme
  );
  const logo1: IFile | undefined = useAppSelector(state => state.websiteConfiguration.logo1);
  //#endregion store

  const [activeForm, setActiveForm] = React.useState<ActiveForm>(
    ActiveForm.Register
  );

  const styles = useStyles({ theme });
  const isLoggedIn: boolean = useIsLoggedIn();
  const getTranslatedText = useGetTranslatedText();

  const handleSwitchToForgotPasswordForm = () => {
    setActiveForm(ActiveForm.ForgotPassword);
  };

  return (
    <div className={styles.loginOrRegistrationPageContainer}>

      <div className={styles.left}></div>

      <div className={styles.right}>

        <br />
        <br />

        {logo1 && <div style={{
          background: 'url(' + logo1.url + ')' + ' center center'
        }} className={styles.logo1} />}

        {activeForm === ActiveForm.Register &&
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

export default React.memo(LoginOrRegistrationPage)
