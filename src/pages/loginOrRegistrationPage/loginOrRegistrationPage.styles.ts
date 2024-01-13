import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  loginOrRegistrationPageContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    height: "100vh",
    backgroundColor: theme.backgroundColor,
  },
  left: {
    width: "50%",
    boxSizing: "border-box",
    backgroundColor: "",
    height: "100vh",
    background:
      "linear-gradient(to right top, " +
      theme.darkerPrimary +
      ", " +
      theme.primary +
      ")",
  },
  right: {
    width: "50%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 70,
  },
  welcome: {
    color: theme.lightTextColor,
    marginTop: 230,
    paddingLeft: 100,
    fontSize: 55,
    marginBottom: 20,
  },
  solutionDescription: {
    marginTop: 0,
    color: theme.lightTextColor,
    paddingLeft: 100,
    fontSize: 35,
    width: "60%",
  },
  logo1: {
    width: "120px!important",
    height: "135px!important",
    backgroundSize: "120px!important",
    backgroundPosition: "center!important",
  },
  switchFormContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: theme.darkTextColor,
  },
  switchFormButton: {
    color: theme.primary,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 15,
  },
  "@media (max-width: 930px)": {
    left: {
      display: "none",
    },
    right: {
      paddingTop: 50,
      width: "100%",
    },
  },
}));

export default useStyles;
