import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatContactsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    backgroundColor: theme.subContentBackgroundColor,
    height: "100%",
    width: 300,
    minWidth: 300,
    overflow: "scroll",
    paddingRight: 10,

    "& .rc-pagination": {
      marginRight: 10,
      marginLeft: 10,
      paddingLeft: 15,
      maxWidth: 340,
      overflow: "scroll",
    },

    "& li": {
      fontSize: 15,
    },
  },
  top: {
    width: "100%",
  },
  contactsTitle: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20,
    color: theme.lightTextColor,
    textAlign: "center",
  },
  chatContactsListContainer: {
    width: "100%",
    overflow: "scroll",
    display: "flex",
    flexDirection: "column",
  },
  chatContactsContainerConversationSelected: {
    extend: "chatContactsContainer",
  },
  noConversationSelectedChatContactsContainer: {
    extend: "chatContactsContainer",
  },
  "@media (max-width: 850px)": {
    chatContactsContainerConversationSelected: {
      display: "none",
    },
    noConversationSelectedChatContactsContainer: {
      width: "100%",
      display: "flex",
    },
  },
  "@media (max-width: 400px)": {
    chatContactsContainer: {
      minWidth: "initial",
    },
    chatContactsContainerConversationSelected: {
      minWidth: "initial",
    },
    noConversationSelectedChatContactsContainer: {
      minWidth: "initial",
    },
  },
}));

export default useStyles;
