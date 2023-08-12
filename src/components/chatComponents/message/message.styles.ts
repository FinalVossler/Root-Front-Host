import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  messageAndOptionsContainer: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    marginBottom: 10,
    flexDirection: "row-reverse",
    "&:hover $messageOptions": {
      display: "flex",
      color: theme.darkerPrimary,
    },
    "&:hover $otherMessageOptions": {
      display: "flex",
      color: theme.primary,
    },
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
    marginLeft: 10,
    marginRight: 10,
    position: "relative",
    maxWidth: "65%",
    boxShadow: theme.boxShadow,
  },
  otherMessageContainer: {
    extend: "messageContainer",
    backgroundColor: theme.primary,
  },
  messageOptions: {
    display: "none",
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
  "@media (max-width: 800px)": {},
}));

export default useStyles;
