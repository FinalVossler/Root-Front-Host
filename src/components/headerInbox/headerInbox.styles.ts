import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  headerInboxContainer: {
    position: "relative",
  },
  inboxIcon: {
    fontSize: 26,
    color: theme.lightTextColor,
    cursor: "pointer",
    margin: 20,
    padding: 5,
  },
  inboxPopup: {
    backgroundColor: theme.lightTextColor,
    color: theme.darkTextColor,
    padding: 10,
    boxShadow: theme.boxShadow,
    position: "absolute",
    top: 70,
    right: -50,
    borderRadius: 5,
    width: 300,
  },
  conversationContainer: {
    padding: 10,
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    borderRadius: 10,

    "&:hover": {
      backgroundColor: theme.secondary,
      color: theme.lightTextColor,
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
  "@media (max-width: 800px)": {},
}));

export default useStyles;
