import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    height: 100,
    width: "100%",
    boxSizing: "border-box",
  },
  inputAndSendContainer: {
    backgroundColor: theme.chatContentBoxColor,
    display: "flex",
    alignItems: "center",
    height: 45,
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 50,
    marginLeft: 0,
    marginRight: 20,
  },
  chatInput: {
    flex: 1,
    height: "97%",
    border: "none",
    padding: 0,
    backgroundColor: "transparent",
    paddingLeft: 20,
    color: theme.lightTextColor,
  },
  sendButton: {
    width: 120,
    height: "100%",
    border: "none",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: theme.chatButtonColor,
    borderRadius: 50,
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
