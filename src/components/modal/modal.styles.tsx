import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
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

    boxShadow: theme.boxShadow,
    borderRadius: "40px",
    zIndex: 102,
    maxHeight: "90%",
  },
}));

export default useStyles;
