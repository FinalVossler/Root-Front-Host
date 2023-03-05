import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  ownFilesContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    border: "1px solid " + theme.borderColor,
    marginTop: 10,
    marginBottom: 20,
    borderRadius: 10,
    minHeight: 300,
  },
  noFiles: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    color: theme.lightTextColor,
  },
  singleFileContainer: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",

    border: "2px solid " + theme.secondary,
    boxSizing: "border-box",

    width: 100,
    height: 100,
    backgroundSize: "cover",
    backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "inherit",
    margin: 5,
  },
  selectedSingleFileContainer: {
    extend: "singleFileContainer",
    borderColor: theme.primary,
    borderWidth: 3,
    width: 250,
    height: 250,
  },
  fileIcon: {
    extend: "singleFileContainer",
  },
  fileName: {
    textAlign: "center",
    color: theme.lightTextColor,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
