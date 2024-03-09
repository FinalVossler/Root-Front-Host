import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  columnOrRow: {
    position: "relative",
  },
  sortHandle: {
    color: theme.primary,
    cursor: "pointer",
    position: "absolute",
    right: 0,
    zIndex: 1,
    top: 1,
  },
  deleteIcon: {
    cursor: "pointer",
    position: "absolute",
    right: 15,
    fontSize: 20,
    top: 0,
    color: theme.errorColor,
  },
}));

export default useStyles;
