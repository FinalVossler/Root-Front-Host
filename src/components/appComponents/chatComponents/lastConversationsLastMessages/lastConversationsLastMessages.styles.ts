import { createUseStyles } from "react-jss";

import { ITheme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  lastConversationsLastMessagesContainer: {
    color: theme.lightTextColor,
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: "85vh",
    overflowY: "auto",
    boxSizing: "border-box",
    paddingLeft: 0,
    paddingTop: 10,
    paddingBottom: 20,
    paddingRight: 20,
  },
  lastConversationsLastMessagesLoading: {
    color: theme.primary,
    fill: theme.primary + "!important",
  },
}));

export default useStyles;
