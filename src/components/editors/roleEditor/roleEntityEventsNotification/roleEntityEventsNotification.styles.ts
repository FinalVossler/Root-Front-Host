import { createUseStyles } from "react-jss";

import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  roleEntityEventNotificationContainer: {},
  singleEventNotification: {
    position: "relative",
    border: "1px solid " + theme.darkTextColor,
    marginBottom: 10,
    padding: 10,
    paddingTop: 20,
  },
  addEventButton: {
    cursor: "pointer",
  },
  plusButton: {},
  deleteIcon: {
    color: theme.errorColor,
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 20,
    cursor: "pointer",
  },
}));

export default useStyles;
