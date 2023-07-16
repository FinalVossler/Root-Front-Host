import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  confirmationModalContainer: {
    display: "flex",
    zIndex: 10,
    position: "fixed",
    width: "100%",
    height: "100%",
    top: 0,
    left: 0,
  },
  layer: {
    display: "flex",
    width: "100%",
    height: "100%",
    position: "fixed",
    backgroundColor: theme.darkTextColor,
    opacity: 0.4,
  },
  confirmationModal: {
    minWidth: 200,
    paddingTop: 30,
    paddingBottom: 30,
    paddingRight: 100,
    paddingLeft: 100,
    borderRadius: 10,
    display: "flex",
    backgroundColor: theme.lightTextColor,
    margin: "auto",
    flexDirection: "column",
    alignItems: "center",
    zIndex: 2,
    boxShadow: "0px 0px 10px 1px #00000024",
    width: "50%",
  },
  description: {
    color: theme.darkTextColor,
    marginTop: 10,
    textAlign: "center",
    lineHeight: 2,
  },
  title: {
    fontWeight: "bold",
    color: theme.darkTextColor,
    marginBottom: 5,
    textAlign: "center",
  },
  buttonsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 20,
  },
  "@media (max-width: 850px)": {
    confirmationModal: {
      width: "85%",
      minWidth: "initial",
      padding: 20,
      boxSizing: "border-box",
    },
  },
}));

export default useStyles;
