import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  chatBoxContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    flex: 1,
    position: "relative",
  },
  smallBoxContainer: {
    extend: "chatBoxContainer",
    width: 380,
    minWidth: 380,
    height: 470,
    backgroundColor: theme.subContentBackgroundColor,
    border: "1px solid " + theme.borderColor,
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
    paddingBottom: 20,
    paddingRight: 20,
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
  typingUserContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: "0px 10px",
  },
  typingUserIndicator: {
    textAlign: "center",
    fontSize: 40,
    marginLeft: 10,
    borderRadius: 10,
    backgroundColor: theme.primary,
    color: theme.lightTextColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0px 10px",
  },
  "@media (max-width: 850px)": {
    noConversationSelectedChatBoxContainer: {
      display: "none",
    },
  },
}));

export default useStyles;
