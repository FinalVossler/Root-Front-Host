import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  messageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    backgroundColor: theme.chatOwnMessageColor,
    padding: 20,
    marginBottom: 10,
    borderRadius: 10,
    marginLeft: 20,
  },
  otherMessageContainer: {
    extend: "messageContainer",
    backgroundColor: theme.chatOtherMessageColor,
    alignSelf: "flex-end",
    marginRight: 20,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
