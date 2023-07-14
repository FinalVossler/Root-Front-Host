import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  loginOrRegistrationPageContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    backgroundColor: theme.backgroundColor,
  },
  left: {
    width: '50%',
    boxSizing: 'border-box',
    backgroundColor: '',
    height: '100vh',
    background: "linear-gradient(" + theme.darkerPrimary + ", " + theme.lighterPrimary + ")"
  },
  right: {
    width: '50%',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  logo1: {
    width: '140px!important',
    height: '160px!important',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
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
    
  },
}));

export default useStyles;
