import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  messageOptionsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 10,
    height: 40,
    color: theme.darkerPrimary,
  },
  messageOptionsIcon: {
    cursor: "pointer",
    marginLeft: 0,
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
    left: "-50%",
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
    margin: "0px 1px",
  },
}));

export default useStyles;
