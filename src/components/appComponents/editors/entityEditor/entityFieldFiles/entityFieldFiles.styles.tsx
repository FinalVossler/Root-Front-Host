import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  label: {
    color: theme.darkTextColor,
    fontSize: 20,
    marginBottom: 5,
  },
  addFilesContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: 20,
    border: "1px solid " + theme.borderColor,
    padding: 10,
    boxSizing: "border-box",
    borderRadius: 5,
  },
  disabledAddFilesContainer: {
    extend: "addFilesContainer",
    backgroundColor: theme.disabledColor,
  },
  filesButtonsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    cursor: "pointer",
    color: theme.primary,
    fontSize: 40,
  },
  chooseFilesButton: {
    fontSize: 100,
    cursor: "pointer",
    color: theme.primary,
  },
  newFilesContainer: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
  },
  singleFileContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    margin: 5,
    border: "1px solid " + theme.primary,
    padding: 10,
    borderRadius: 10,
    width: 130,
    height: 130,
    boxSizing: "border-box",

    overflow: "auto",
  },
  fileName: {
    fontSize: 15,
    color: theme.darkTextColor,
    maxWidth: "100%",
    textAlign: "center",
  },
  fileIcon: {
    fontSize: 50,
    color: theme.primary,
  },
  trackedImage: {
    boxSizing: "border-box",

    position: "relative",
    height: 130,
    width: 130,
    borderRadius: 10,
    margin: 10,
    border: "1px solid " + theme.primary,

    backgroundSize: "cover",
    backgroundBlendMode: "screen",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundOrigin: "inherit",
  },
  deleteIcon: {
    cursor: "pointer",
    color: theme.primary,
    position: "absolute",
    top: 0,
    right: 0,
    fontSize: 20,
    boxShadow: theme.boxShadow,
    backgroundColor: theme.secondary,
  },
  "@media (max-width: 850px)": {
    createEntityModalContainer: {
      width: "70vw",
    },
  },
}));

export default useStyles;
