import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  profileFormContainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
    borderRadius: 20,
    padding: 40,
    paddingTop: 10,
    marginTop: 0,
    paddingBottom: 40,
    backgroundColor: theme.contentBackgroundColor,
    boxSizing: "border-box",
  },
  profileFormTitle: {
    fontSize: 30,
    color: theme.primary,
  },
  profileForm: {
    display: "flex",
    flexDirection: "column",
  },
  userRole: {
    color: theme.lightTextColor,
    marginBottom: 10,
  },
  actualRole: {
    fontWeight: "bold",
    color: theme.primary,
  },
  triggerShowChangePasswordFormIcon: {
    color: theme.lightTextColor,
    position: "relative",
    top: 0,
    fontSize: 30,
  },
  "@media (max-width: 930)": {},
}));

export default useStyles;
