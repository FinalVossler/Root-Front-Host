import { createUseStyles } from "react-jss";
import { Theme } from "../../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  messageFilePreviewContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#000000cf",
    zIndex: 99,
  },
  mainFileContainer: {
    width: "100%",
    flex: 1,
    display: "flex",
    alignItems: "center",
    zIndex: 2,
    justifyContent: "center",
  },
  file: {
    maxWidth: "100%",
    maxHeight: "100%",
  },
  closeButton: {
    position: "absolute",
    top: 20,
    right: 30,
    color: theme.darkerPrimary,
    borderRadius: 10,
    zIndex: 10,
    boxShadow: theme.boxShadow,
    fontSize: 30,
    cursor: "pointer",
    backgroundColor: theme.lighterPrimary,
  },
}));

export default useStyles;
