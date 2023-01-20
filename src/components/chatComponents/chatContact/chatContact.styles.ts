import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatContactContainer: {
    display: "flex",
    flexDirection: "row",
    position: "relative",
    backgroundColor: theme.chatContentBoxColor,
    height: 80,
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
    backgroundColor: theme.chatSelectContactBoxColor,
  },
  chatAvatar: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    marginRight: 20,
  },
  contactName: {
    color: "white",
    fontSize: 15,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
