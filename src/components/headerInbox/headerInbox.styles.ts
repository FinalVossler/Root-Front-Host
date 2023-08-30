import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  headerInboxContainer: {
    position: "relative",
  },
  headerInboxLoading: {
    color: theme.primary,
    fill: theme.primary + "!important",
  },
  inboxIcon: {
    fontSize: 26,
    color: theme.darkTextColor,
    cursor: "pointer",
    margin: 20,
    padding: 5,
  },
  inboxPopup: {
    backgroundColor: theme.contentBackgroundColor,
    color: theme.lightTextColor,
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
    overflowY: "auto",
    paddingBottom: 20,
    paddingRight: 20,
    zIndex: 8,
    boxSizing: "border-box",
    paddingLeft: 0,
    paddingTop: 10,
  },

  userNameAndLastMessage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 20,
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
  "@media (max-width: 800px)": {
    inboxPopup: {
      width: 300,
    },
  },
}));

export default useStyles;
