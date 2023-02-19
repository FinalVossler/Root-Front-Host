import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  modalContainer: {
    zIndex: 2,
    position: "fixed",
    top: "0px",
    left: "0px",
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  layer: {
    zIndex: 3,
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
    zIndex: 4,
    width: "80%",
  },
}));

export default useStyles;
