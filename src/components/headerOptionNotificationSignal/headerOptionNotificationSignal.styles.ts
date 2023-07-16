import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  notificationSignalContainer: {
    width: 17,
    height: 17,
    backgroundColor: "#cb202e",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    top: 20,
    right: 20,
  },
  numberOfNotifications: {
    color: theme.lightTextColor,
    position: "relative",
    fontSize: 12,
    top: 1,
  },
}));

export default useStyles;
