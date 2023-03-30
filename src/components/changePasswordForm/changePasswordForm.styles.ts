import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  changePasswordFormcontainer: {
    display: "flex",
    flexDirection: "column",
    margin: "auto",
    width: "100%",
    borderRadius: 20,
    paddingTop: 10,
    marginTop: 0,
    paddingBottom: 40,
    backgroundColor: theme.contentBackgroundColor,
    boxSizing: "border-box",
  },
  changePasswordFormTitle: {
    fontSize: 30,
    color: theme.primary,
  },
  changePasswordForm: {
    display: "flex",
    flexDirection: "column",
  },
  "@media (max-width: 930)": {},
}));

export default useStyles;
