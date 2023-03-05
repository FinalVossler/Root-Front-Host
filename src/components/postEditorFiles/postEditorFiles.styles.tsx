import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  postEditorFilesContainer: {
    width: "100%",
    marginTop: 10,
  },
  icon: {
    cursor: "pointer",
    color: theme.primary,
    fontSize: 40,
  },
  buttonsContainer: {
    justifyContent: "flex-start",
    display: "flex",
    alignItems: "center",
  },
  filesContainer: {
    justifyContent: "flex-start",
    display: "flex",
    alignItems: "center",
  },
  imagesContainer: {
    justifyContent: "flex-start",
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  singleFileContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    width: 100,
    height: 100,
    marginRight: 20,
    marginBottom: 10,
  },
  fileIcon: {
    extend: "singleImage",
    color: theme.primary,
  },
  singleImage: {
    width: "100%",
    height: "100%",
    backgroundSize: "cover",
    backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "inherit",
    border: "none",
    margin: 5,
  },
  removeIcon: {
    cursor: "pointer",
    position: "absolute",
    color: theme.subContentBackgroundColor,
    left: 0,
    top: 0,
    fontSize: 30,
  },
  fileName: {
    color: theme.lightTextColor,
    textAlign: "center",
  },
  chooseFilesButton: {
    fontSize: 45,
    cursor: "pointer",
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
