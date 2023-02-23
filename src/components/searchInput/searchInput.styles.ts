import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  searchInputContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
  searchResultBox: {
    display: "flex",
    backgroundColor: theme.secondary,
    position: "absolute",
    flexDirection: "column",
    alignItems: "flex-start",
    padding: 20,
    top: 50,
    maxHeight: 300,
    overflow: "auto",
    width: "100%",
    boxSizing: "border-box",
    paddingBottom: 10,
    borderRadius: 10,
    zIndex: 1,
  },
  singleResult: {
    marginBottom: 5,
    cursor: "pointer",
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: theme.primary,
    padding: 10,
    borderRadius: 5,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
