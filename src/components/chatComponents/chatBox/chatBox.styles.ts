import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatBoxContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
  },
  chatMessagesBox: {
    flex: 1,
    color: theme.lightTextColor,
    marginTop: 10,
    display: "flex",
    flexDirection: "column",
    overflow: "scroll",
    alignItems: "flex-start",
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
  noConversationSelectedChatBoxContainer: {
    extend: "chatBoxContainer",
  },
  "@media (max-width: 850px)": {
    noConversationSelectedChatBoxContainer: {
      display: "none",
    },
  },
}));

export default useStyles;
