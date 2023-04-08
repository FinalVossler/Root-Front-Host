import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  headerInboxContainer: {
    position: "relative",
  },
  headerInboxLoading: {
    color: theme.lightTextColor,
    fill: theme.primary + "!important",
  },
  inboxIcon: {
    fontSize: 26,
    color: theme.lightTextColor,
    cursor: "pointer",
    margin: 20,
    padding: 5,
  },
  inboxPopup: {
    backgroundColor: theme.secondary,
    color: theme.lightTextColor,
    boxShadow: theme.boxShadow,
    position: "absolute",
    top: 70,
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
  conversationContainer: {
    padding: 10,
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    borderRadius: 10,
    width: "95%",
    boxSizing: "border-box",

    "&:hover": {
      backgroundColor: theme.darkerPrimary,
      color: theme.lightTextColor,

      "& svg": {
        color: theme.lightTextColor + "!important",
      },
      "& div": {
        borderColor: theme.lightTextColor + "!important",
      },
    },
  },
  userNameAndLastMessage: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 20,
  },
  userName: {},
  messageContent: {
    opacity: 0.7,
  },
  "@media (max-width: 800px)": {
    inboxPopup: {
      width: 300,
    },
  },
}));

export default useStyles;
