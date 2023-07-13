import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  existingFilesContainer: {
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
    position: "relative",
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
    color: theme.primary,
  },
  fileName: {
    textAlign: "center",
    color: theme.darkTextColor,
  },
  loadingContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  downloadButton: {
    color: theme.primary,
    fontSize: 25,
    position: "absolute",
    top: 5,
    right: 5,
    paddingRight: 2,
    paddingLeft: 2,
    backgroundColor: theme.lightTextColor,
    height: 26,
    borderRadius: 2,
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
