import { createUseStyles } from "react-jss";
import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
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
