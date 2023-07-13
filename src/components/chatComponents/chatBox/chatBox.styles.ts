import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatBoxContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    position: "relative",
  },
  noConversationSelectedChatBoxContainer: {
    extend: "chatBoxContainer",
  },
  smallBoxContainer: {
    extend: "chatBoxContainer",
    width: 350,
    minWidth: 350,
    height: 470,
    backgroundColor: theme.backgroundColor,
    marginRight: 20,
    border: "1px solid " + theme.darkTextColor,
    boxSizing: "border-box",
    boxShadow: theme.boxShadow,
  },
  chatMessagesBox: {
    flex: 1,
    color: theme.lightTextColor,
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    overflowY: "auto",
    borderTop: "1px solid " + theme.darkTextColor,
    paddingTop: 5,
  },
  loadMoreButtonContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  loadMoreButton: {
    backgroundColor: theme.primary,
    border: "none",

    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    color: theme.lightTextColor,
    width: 60,
    borderRadius: 10,
  },
  closeButton: {
    position: "absolute",
    right: 10,
    color: theme.errorColor,
    top: 17,
    fontSize: 25,
    cursor: "pointer",
  },
  "@media (max-width: 850px)": {
    noConversationSelectedChatBoxContainer: {
      display: "none",
    },
  },
}));

export default useStyles;
