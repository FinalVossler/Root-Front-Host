import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  postsEditorContainer: {
    width: "100%",
    position: "relative",
  },
  postsContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    position: "relative",
  },
  singlePostContainer: {
    display: "flex",
    position: "relative",
    border: "1px solid " + theme.primary,
    marginBottom: 10,
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: "100%",
    boxSizing: "border-box",
    height: 360,
    overflow: "auto",
  },
  deletePostButton: {
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 20,
    cursor: "pointer",
    zIndex: 3,
  },
  sortPostHandle: {
    extend: "deletePostButton",
    right: 30,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
