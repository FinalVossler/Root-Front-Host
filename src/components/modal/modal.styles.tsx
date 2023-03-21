import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  modalContainer: {
    zIndex: 9,
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
    zIndex: 7,
    display: "flex",
    width: "100%",
    height: "100%",
    position: "fixed",
    backgroundColor: theme.darkTextColor,
    opacity: 0.7,
  },
  modal: {
    display: "flex",
    padding: "20px",
    paddingBottom: "5px",
    backgroundColor: theme.contentBackgroundColor,

    boxShadow: theme.boxShadow,
    borderRadius: "40px",
    zIndex: 8,
    // width: "80%",
    maxHeight: "90%",
  },
}));

export default useStyles;
