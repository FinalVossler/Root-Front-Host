import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  columnOptionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  columnOptionsIcon: {
    cursor: "pointer",
    marginLeft: 10,
  },
  optionsContainer: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.lightTextColor,
    boxShadow: theme.boxShadow,
    padding: 10,
    position: "absolute",
    right: -20,
    top: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  hideColumnButton: {
    color: theme.errorColor,
    position: "relative",
    cursor: "pointer",
  },
}));

export default useStyles;
