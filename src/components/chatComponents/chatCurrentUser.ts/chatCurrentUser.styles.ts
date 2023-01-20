import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatCurrentUserContainer: {
    display: "flex",
    height: 100,
    width: "100%",
    alignItems: "center",
    boxSizing: "border-box",
    paddingBottom: 20,
    paddingTop: 20,
    backgroundColor: theme.chatCurrentUserColor,
  },
  currentUserAvatar: {
    width: 80,
    height: 80,
    marginLeft: 30,
    borderRadius: "50%",
    marginRight: 30,
  },
  currentUserName: {
    fontSize: 20,
    color: "white",
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
