import { createUseStyles } from "react-jss";
import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  messageOptionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 10,
    height: 50,
    color: theme.darkerPrimary,
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
  emojiLayer: {
    position: "fixed",
    top: 0,
    right: 0,
    width: "100%",
    height: "100%",
  },
  emojiContainer: {
    backgroundColor: theme.lightTextColor,
    padding: 10,
    top: 5,
    borderRadius: 5,
    zIndex: 10,
    position: "absolute",
    boxShadow: theme.boxShadow,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  singleReaction: {
    cursor: "pointer",
    margin: "0px 7px",
  },
}));

export default useStyles;
