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
    width: "70%",
    borderRadius: 20,
    padding: 40,
    paddingTop: 10,
    backgroundColor: theme.contentBackgroundColor,
    margin: "auto",
    marginBottom: 0,
    marginTop: 150,
  },

  changePasswordTitle: {
    fontSize: 30,
    color: theme.primary,
  },
}));

export default useStyles;
