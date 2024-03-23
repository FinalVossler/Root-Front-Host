import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  headerInboxContainer: {
    position: "relative",
    cursor: "pointer",
    height: "100%",

    "&:hover": {
      boxShadow: theme.boxShadow,
    },
  },
  inboxIcon: {
    fontSize: 26,
    color: theme.darkTextColor,
    margin: 19,
    padding: 5,
    width: 40,
  },
  notificationNumber: {
    position: "absolute",
    color: theme.errorColor,
    fontSize: "20px",
    top: 13,
    right: 20,
    fontWeight: 900,
    zIndex: 2,
  },
  inboxPopup: {
    backgroundColor: theme.contentBackgroundColor,
    boxShadow: theme.boxShadow,
    position: "absolute",
    top: 80.5,
    minHeight: 200,
    right: -50,
    borderRadius: 5,
    width: 350,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: "85vh",
    zIndex: 8,
    boxSizing: "border-box",
  },
  "@media (max-width: 1000px)": {
    headerInboxContainer: {
      display: "none!important",
    },
  },
}));

export default useStyles;
