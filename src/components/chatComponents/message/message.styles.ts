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
    cursor: "pointer",
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
    cursor: "pointer",
    color: theme.primary,
    zIndex: 15,
  },
  reactorName: {
    position: "absolute",
    top: -40,
    textAlign: "center",
    whiteSpace: "nowrap",
    backgroundColor: theme.darkTextColor,
    padding: 10,
    borderRadius: 5,
  },
  messageDate: {
    backgroundColor: theme.primary,
    color: theme.lightTextColor,
    padding: "10px 13px",
    borderRadius: 10,
    opacity: 0.9,
    marginRight: 10,
    fontSize: 12,
  },
  otherMessageDate: {
    extend: "messageDate",
    marginLeft: 10,
    marginRight: "initial",
  },
  readByContainer: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    bottom: -10,
    right: 10,
    zIndex: 10,
    backgroundColor: theme.lightTextColor,
    padding: 2,
    borderRadius: 5,
    border: "1px solid " + theme.darkerPrimary,
  },
  useReadProfilePicture: {
    position: "relative",
    "&:hover $firstNameAndLastNameAndReadAt": {
      display: "flex",
    },
  },
  firstNameAndLastNameAndReadAt: {
    flexDirection: "column",
    alignItems: "center",
    position: "absolute",
    top: -47,
    textAlign: "center",
    whiteSpace: "nowrap",
    backgroundColor: theme.darkTextColor,
    padding: 5,
    borderRadius: 5,
    left: -10,
    display: "none",
  },
  viewFileIcon: {
    cursor: "pointer",
  },
  senderName: {
    color: theme.darkerPrimary,
    fontSize: 15,
    position: "absolute",
    bottom: -18,
    zIndex: 1,
    left: 12,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
