import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  userPostsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.lightTextColor,
    padding: 20,
    paddingTop: 0,
    borderRadius: 10,
  },
  "@media (max-width: 850px)": {
    userPostsContainer: {
      width: "100%",
    },
  },
}));

export default useStyles;
