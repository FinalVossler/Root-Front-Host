import { createUseStyles } from "react-jss";

import { ITheme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  chatContactsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    backgroundColor: theme.contentBackgroundColor,
    height: "100%",
    width: 300,
    minWidth: 300,
    paddingRight: 10,
    borderRadius: 5,

    "& .rc-pagination": {
      marginRight: 10,
      marginLeft: 10,
      paddingLeft: 15,
      maxWidth: 340,
      overflow: "auto",
    },

    "& li": {
      fontSize: 15,
    },
  },
  top: {
    width: "100%",
    overflow: "auto",
  },
  contactsTitle: {
    paddingTop: 20,
    paddingBottom: 20,
    fontSize: 20,
    color: theme.darkTextColor,
    textAlign: "center",
  },
  chatContactsListContainer: {
    width: "100%",
    overflow: "auto",
    display: "flex",
    paddingTop: 2,
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
