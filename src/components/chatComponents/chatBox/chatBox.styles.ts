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
  smallBoxContainer: {
    extend: "chatBoxContainer",
    width: 350,
    minWidth: 350,
    height: 470,
    backgroundColor: theme.backgroundColor,
    marginRight: 20,
    boxSizing: "border-box",
    boxShadow: theme.boxShadow,
  },
  highlightedSmallBox: {
    extend: "smallBoxContainer",
    backgroundColor: theme.contentBackgroundColor,
  },
  chatMessagesBox: {
    flex: 1,
    color: theme.lightTextColor,
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    overflowY: "auto",
    borderTop: "2px solid " + theme.secondary,
    paddingTop: 10,
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
    boxShadow: theme.boxShadow,
    borderRadius: "50%",
    boxSizing: "border-box",
  },
  "@media (max-width: 850px)": {
    noConversationSelectedChatBoxContainer: {
      display: "none",
    },
  },
}));

export default useStyles;
