import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  headerInboxContainer: {
    position: "relative",
    cursor: "pointer",

    transition: "all .2s ease-in-out",
    "&:hover": {
      boxShadow: theme.boxShadow,
    },
  },
  inboxIcon: {
    fontSize: 26,
    color: theme.darkTextColor,
    cursor: "pointer",
    margin: 19,
    padding: 5,
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
    top: 70,
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

  "@media (max-width: 800px)": {
    inboxPopup: {
      width: 300,
    },
  },
}));

export default useStyles;
