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
    cursor: "pointer",
  },
  currentUserAvatar: {
    width: 80,
    height: 80,
    marginLeft: 30,
    borderRadius: "50%",
    marginRight: 30,
  },
  defaultAvatar: {
    extend: "currentUserAvatar",
    color: theme.chatButtonColor,
  },
  currentUserName: {
    fontSize: 20,
    color: theme.lightTextColor,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
