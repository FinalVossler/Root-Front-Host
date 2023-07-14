import { createUseStyles } from "react-jss";
import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  tasksByModelContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.darkTextColor
  },
  tableCase: {
    padding: 10,
  },
}));

export default useStyles;
