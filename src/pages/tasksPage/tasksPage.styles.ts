import { createUseStyles } from "react-jss";
import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  tasksPageContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.backgroundColor,
    alignItems: "center",
    minHeight: "100vh",
    paddingBottom: 300,
    marginTop: 120,
    padding: 40,
    maxWidth: "90%",
  },
  loading: {},
}));

export default useStyles;
