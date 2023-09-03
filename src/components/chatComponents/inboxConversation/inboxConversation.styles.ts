import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  conversationContainer: {
    padding: 10,
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    borderRadius: 10,
    width: "95%",
    boxSizing: "border-box",
    backgroundColor: theme.lightTextColor,
    border: "1px solid " + theme.primary,
    marginBottom: 5,
    color: theme.primary,
    position: "relative",

    "&:hover": {
      backgroundColor: theme.primary,
      color: theme.lightTextColor,

      "& svg": {
        color: theme.lightTextColor + "!important",
      },
      "& div": {
        borderColor: theme.lightTextColor + "!important",
      },
      "& span": {
        color: theme.lightTextColor + "!important",
      },
      "& userNameAndLastName": {
        color: theme.lightTextColor + "!important",
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
  notificationContainer: {
    display: "flex",
    position: "absolute",
    right: 10,
    color: theme.errorColor,
  },
  notificationIcon: {},
  totalUnreadMessages: {
    color: theme.errorColor,
  },
  "@media (max-width: 800px)": {
    inboxPopup: {
      width: 300,
    },
  },
}));

export default useStyles;
