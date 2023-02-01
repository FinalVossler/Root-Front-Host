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
    backgroundColor: theme.boxColor,
    display: "flex",
    alignItems: "strech",
    flex: 1,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    marginLeft: 0,
    marginRight: 20,
    minHeight: 35,
    maxHeight: "50vh",
    overflow: "scroll",
    position: "relative",
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
    width: 35,
    height: 35,
    bottom: 0,
    border: "none",
    padding: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backgroundColor: theme.primary,
    borderRadius: 40,
    position: "absolute",
    right: "0px",
  },
  sendButtonIcon: {
    color: theme.lightTextColor,
    fontSize: 20,
  },
  EmojiPickerReact: {
    position: "absolute",
  },
  emojiButton: {
    color: theme.primary,
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
  filesButton: {
    extend: "emojiButton",
    marginRight: -2,
  },
  filesContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    overflow: "scroll",
    paddingLeft: 20,
    maxWidth: "15%",
    flexWrap: "wrap",
  },
  singleFileContainer: {
    height: 40,
    width: 30,
    margin: 5,
    display: "flex",
    alignItems: "center",
    position: "relative",
  },
  fileIcon: {
    height: "auto",
    width: "100%",
    color: theme.primary,
  },
  fileDeleteButton: {
    position: "absolute",
    color: theme.secondary,
    right: -5,
    top: -2,
    fontSize: 13,
    cursor: "pointer",
  },
  loading: {
    height: 36,
    width: 36,
    position: "absolute",
    right: 0,
    zIndex: 2,
    bottom: 0,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
