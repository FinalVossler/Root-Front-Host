import { createUseStyles } from "react-jss";

import { ITheme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  profileFormContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    borderRadius: 20,
    padding: 40,
    paddingTop: 10,
    marginTop: 0,
    paddingBottom: 40,
    backgroundColor: theme.lightTextColor,
    boxSizing: "border-box",
    boxShadow: theme.boxShadow,
  },
  profileFormTitle: {
    fontSize: 30,
    color: theme.darkTextColor,
  },
  profileForm: {
    display: "flex",
    flexDirection: "column",
  },
  userRoleContainer: {
    color: theme.darkTextColor,
    marginBottom: 10,
  },
  role: {
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
