import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  headerNotificationContainer: {
    position: "relative",
    cursor: "pointer",
    height: "100%",

    "&:hover": {
      boxShadow: theme.boxShadow,
    },
  },
  headerNotificationLoading: {
    fill: theme.primary + "!important",
  },
  notificationIconContainer: {},
  notificationIcon: {
    fontSize: 26,
    color: theme.darkTextColor,
    cursor: "pointer",
    margin: 19,
    padding: 5,
    width: 40,
  },
  notificationPopup: {
    backgroundColor: theme.lightTextColor,
    color: theme.lightTextColor,
    boxShadow: theme.boxShadow,
    position: "absolute",
    top: 80.5,
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
    "&:hover $notificationText": {
      color: theme.lightTextColor,
    },
  },
  notificationContainerUnclicked: {
    extend: "notificationContainer",
    backgroundColor: theme.primary,
    color: theme.darkTextColor,

    "& $notificationText": {
      color: theme.lightTextColor,
    },
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
