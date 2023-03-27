import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  filesInputContainer: {
    width: "100%",
    marginTop: 10,
    position: "relative",
    marginBottom: 10,
  },
  fileInputLabel: {
    color: theme.lightTextColor,
    cursor: "pointer",
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
    marginTop: 10,
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
  filesInputDisabledLayer: {
    position: "absolute",
    top: -5,
    right: -5,
    backgroundColor: "black",
    opacity: 0.9,
    width: "calc(100% + 10px)",
    height: "calc(100% + 10px)",
    borderRadius: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  isShowingIcon: {
    color: theme.primary,
    fontSize: 30,
    top: 10,
    position: "relative",
  },
  "@media (max-width: 850px)": {},
}));

export default useStyles;
