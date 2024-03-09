import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
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
    zIndex: 3,
  },
  hideColumnButton: {
    color: theme.errorColor,
    position: "relative",
    cursor: "pointer",
  },
}));

export default useStyles;
