import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
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
    flex: 1,
    margin: "auto",
    width: "100%",
    boxSizing: "border-box",
  },
  deletePostButton: {
    position: "absolute",
    top: 5,
    right: 5,
    fontSize: 20,
    cursor: "pointer",
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
