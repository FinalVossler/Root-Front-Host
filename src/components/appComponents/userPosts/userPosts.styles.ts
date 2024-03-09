import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  userPostsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.darkTextColor,
    padding: 20,
    paddingTop: 0,
    borderRadius: 10,
    boxSizing: "border-box",
  },
  "@media (max-width: 850px)": {
    userPostsContainer: {
      width: "100%",
    },
  },
}));

export default useStyles;
