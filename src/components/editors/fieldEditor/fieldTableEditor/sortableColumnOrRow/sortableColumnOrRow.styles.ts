import { createUseStyles } from "react-jss";

import { Theme } from "../../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
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
