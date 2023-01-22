import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatContactsContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    position: "relative",
    backgroundColor: theme.chatContactsColor,
    height: "100%",
    width: 350,
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
  "@media (max-width: 800px)": {},
}));

export default useStyles;
