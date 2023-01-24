import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    width: "100%",
    boxSizing: "border-box",
  },
  inputAndSendContainer: {
    backgroundColor: theme.chatContentBoxColor,
    display: "flex",
    alignItems: "strech",
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 40,
    marginLeft: 0,
    marginRight: 20,
    minHeight: 35,
  },
  chatInput: {
    flex: 1,
    border: "none",
    padding: 10,
    backgroundColor: "transparent",
    paddingLeft: 20,
    color: theme.lightTextColor,
    minHeight: 35,
    boxSizing: "border-box",

    "&:focus": {
      outline: "0px solid transparent",
    },
  },
  sendButton: {
    width: 120,
    border: "none",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: theme.chatButtonColor,
    borderRadius: 40,
  },
  sendButtonIcon: {
    color: theme.lightTextColor,
    fontSize: 20,
  },
  EmojiPickerReact: {
    position: "absolute",
  },
  emojiButton: {
    color: theme.chatButtonColor,
    fontSize: 35,
    cursor: "pointer",
    margin: 10,
  },
  emojiLayer: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
