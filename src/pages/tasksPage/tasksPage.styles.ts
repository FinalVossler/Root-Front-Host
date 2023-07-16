import { createUseStyles } from "react-jss";
import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  tasksPageContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: 100,
  },
  loading: {},
}));

export default useStyles;
