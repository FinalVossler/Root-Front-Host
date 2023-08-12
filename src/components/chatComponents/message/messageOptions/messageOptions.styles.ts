import { createUseStyles } from "react-jss";
import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  messageOptionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 10,
  },
  messageOptionsIcon: {
    cursor: "pointer",
    marginLeft: 5,
    fontSize: 20,
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
  deleteMessageButton: {
    color: theme.errorColor,
    position: "relative",
    cursor: "pointer",
  },
}));

export default useStyles;
