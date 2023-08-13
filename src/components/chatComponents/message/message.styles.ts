import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  messageAndOptionsContainer: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    marginBottom: 10,
    alignItems: "center",

    flexDirection: "row-reverse",
    position: "relative",
  },
  otherMessageAndOptionsContainer: {
    extend: "messageAndOptionsContainer",
    flexDirection: "row",
  },
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.darkerPrimary,
    padding: 20,
    borderRadius: 10,
    marginRight: 10,
    marginLeft: 5,
    position: "relative",
    maxWidth: "57%",
    boxShadow: theme.boxShadow,
  },
  otherMessageContainer: {
    extend: "messageContainer",
    backgroundColor: theme.primary,
    marginLeft: 10,
    marginRight: 5,
  },
  messageItself: {
    wordWrap: "break-word",
  },
  filesContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    marginTop: 20,
  },
  singleFileContainer: {
    margin: 5,
  },
  file: {
    width: "100%",
  },
  existingReactionsContainer: {
    display: "flex",
    flexDirection: "row",
    position: "absolute",
    bottom: -5,
    left: -10,
  },
  otherExistingReactionsContainer: {
    extend: "existingReactionsContainer",
    left: "initial",
    right: -10,
  },
  singleExistingReaction: {
    margin: "0px 0px",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
