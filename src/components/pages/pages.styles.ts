import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  pagesContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    backgroundColor: theme.contentBackgroundColor,
    borderRadius: 10,
    marginTop: 20,
    padding: 40,
    paddingBottom: 10,
    boxSizing: "border-box",
  },
  pageContainer: {
    paddingBottom: 10,
    paddingTop: 10,
    width: "100%",
    backgroundColor: theme.primary,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 10,
    position: "relative",
  },
  lastPageContainer: {
    extend: "pageContainer",
    marginBottom: 0,
  },
  pageTitle: {
    color: theme.lightTextColor,
  },
  editIcon: {
    position: "absolute",
    right: 35,
    fontSize: 20,
    top: 8,
    cursor: "pointer",
  },
  goIcon: {
    position: "absolute",
    right: 10,
    fontSize: 20,
    top: 8,
  },
}));

export default useStyles;
