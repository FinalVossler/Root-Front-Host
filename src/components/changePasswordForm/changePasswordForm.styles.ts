import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  changePasswordFormcontainer: {
    display: "flex",
    flexDirection: "column",
    maxWidth: theme.formMaxWidth,
    width: "80%",
    borderRadius: 20,
    padding: 10,
    paddingTop: 10,
    paddingBottom: 5,
    backgroundColor: "transparent",
    margin: "auto",
    marginBottom: 0,
  },
  changePasswordFormTitle: {
    fontSize: 30,
    color: theme.darkTextColor,
    textAlign: "center",
    marginTop: 0,
  },
  changePasswordForm: {
    display: "flex",
    flexDirection: "column",
  },
  "@media (max-width: 930)": {},
}));

export default useStyles;
