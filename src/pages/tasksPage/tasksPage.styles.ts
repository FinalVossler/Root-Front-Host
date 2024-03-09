import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  tasksPageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.backgroundColor,
    alignItems: "center",
    minHeight: "100vh",
    boxSizing: "border-box",
  },
  loading: {},
}));

export default useStyles;
