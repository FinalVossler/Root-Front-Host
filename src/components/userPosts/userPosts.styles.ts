import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  userPostsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.darkTextColor,
    padding: 20,
    paddingTop: 0,
    borderRadius: 10,
    boxSizing: "border-box",
    zIndex: 1,
  },
  "@media (max-width: 850px)": {
    userPostsContainer: {
      width: "100%",
    },
  },
}));

export default useStyles;
