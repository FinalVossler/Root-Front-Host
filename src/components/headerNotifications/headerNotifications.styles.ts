import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  headerNotificationContainer: {
    position: "relative",
  },
  headerNotificationLoading: {
    fill: theme.primary + "!important",
  },
  notificationIconContainer: {
    cursor: "pointer",
  },
  notificationIcon: {
    fontSize: 26,
    color: theme.darkTextColor,
    cursor: "pointer",
    margin: 20,
    padding: 5,
  },
  notificationPopup: {
    backgroundColor: theme.lightTextColor,
    color: theme.lightTextColor,
    boxShadow: theme.boxShadow,
    position: "absolute",
    top: 70,
    right: -50,
    borderRadius: 5,
    width: 350,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxHeight: "85vh",
    overflowY: "auto",
    zIndex: 8,
    boxSizing: "border-box",
    padding: 15,
  },
  notificationContainer: {
    padding: 10,
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    borderRadius: 10,
    boxSizing: "border-box",
    marginBottom: 10,
    color: theme.darkTextColor,

    "&:hover": {
      backgroundColor: theme.darkerPrimary,
      color: theme.lightTextColor,

      "& svg": {
        color: theme.lightTextColor + "!important",
      },
      "& div": {
        borderColor: theme.lightTextColor + "!important",
      },
    },
  },
  notificationContainerUnclicked: {
    extend: "notificationContainer",
    backgroundColor: theme.primary,
    color: theme.darkTextColor,
  },
  notificationText: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: 20,
    color: theme.darkTextColor,
    flex: 1,
  },
  "@media (max-width: 800px)": {
    notificationPopup: {
      width: 300,
    },
  },
}));

export default useStyles;
