import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  pagesPageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: theme.contentBackgroundColor,
    borderRadius: 10,
    padding: 40,
    paddingBottom: 10,
    margin: 40,
    marginTop: 120,
    boxSizing: "border-box",
  },
  pageContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
    backgroundColor: theme.primary,
    marginBottom: 10,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    boxSizing: "border-box",
    position: "relative",
    display: "flex",
    flexDirection: "column",
  },
  lastPageContainer: {
    extend: "pageContainer",
    marginBottom: 0,
  },
  pageTitle: {
    color: theme.lightTextColor,
    marginBottom: 10,
    minHeight: 15,
  },
  goIcon: {
    position: "absolute",
    right: 10,
    fontSize: 20,
    top: 8,
    color: theme.darkTextColor,
  },
  deleteIcon: {
    extend: "goIcon",
    right: 35,
    cursor: "pointer",
    color: theme.errorColor,
  },
  pageEditorContainer: {
    backgroundColor: theme.subContentBackgroundColor,
    padding: 1,
    paddingRight: 5,
    paddingLeft: 5,
    borderRadius: 10,
  },
}));

export default useStyles;
