import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  modalContainer: {
    zIndex: 100,
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  layer: {
    display: "flex",
    width: "100%",
    height: "100%",
    position: "fixed",
    backgroundColor: theme.darkTextColor,
    opacity: 0.7,
    zIndex: 101,
  },
  modal: {
    display: "flex",
    padding: "20px",
    paddingBottom: "5px",
    backgroundColor: theme.lightTextColor,
    overflow: "auto",

    boxShadow: theme.boxShadow,
    borderRadius: "10px",
    zIndex: 102,
    maxHeight: "90%",
  },
}));

export default useStyles;
