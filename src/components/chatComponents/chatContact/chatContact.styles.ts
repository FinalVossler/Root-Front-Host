import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatContactContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    backgroundColor: theme.boxColor,
    height: 60,
    alignItems: "center",
    padding: 10,
    boxSizing: "border-box",
    borderRadius: 10,
    marginBottom: 10,
    marginRight: 10,
    marginLeft: 10,
    cursor: "pointer",
  },
  chatSelectedContactContainer: {
    extend: "chatContactContainer",
    backgroundColor: theme.primary,

    "& svg": {
      color: theme.lightTextColor,
    },
  },
  defaultAvatar: {
    extend: "chatAvatar",
    color: theme.primary,
    fontSize: 40,
  },
  contactName: {
    color: theme.darkTextColor,
    fontSize: 15,
    marginLeft: 10,
  },
  notificationContainer: {
    position: "absolute",
    top: "10px",
    left: "3px",
  },
  notificationIcon: {
    position: "absolute",
    color: theme.primary,
    backgroundColor: theme.backgroundColor,
    borderRadius: 10,
    padding: 5,
    zIndex: 1,
  },
  notificationNumber: {
    position: "absolute",
    color: "white",
    fontSize: "20px",
    left: "15px",
    top: "-5px",
    fontWeight: 900,
    zIndex: 2,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
