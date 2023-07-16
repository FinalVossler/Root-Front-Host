import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  forgotPasswordChangePasswordPageContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 100,
    backgroundColor: theme.backgroundColor,
  },
  changePasswordForm: {
    display: "flex",
    flexDirection: "column",
    maxWidth: theme.formMaxWidth,
    width: "80%",
    borderRadius: 20,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: 'transparent',
    margin: "auto",
    marginBottom: 0,
    marginTop: 5
  },
  changePasswordTitle: {
    fontSize: 30,
    color: theme.darkTextColor,
    textAlign: 'center',
    marginTop: 0
  },
}));

export default useStyles;
