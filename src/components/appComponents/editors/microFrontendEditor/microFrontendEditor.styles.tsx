import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  createMicroFrontendModalContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 15,
    position: "relative",
    paddingRight: 10,
    width: "60vw",
    paddingLeft: 2,
    height: "fit-content",
  },

  microFrontendsWarning: {
    color: theme.errorColor,
    textAlign: "center",
  },
  createMicroFrontendHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingBottom: 15,
    borderBottom: "1px solid " + theme.borderColor,
    marginBottom: "10px",
  },
  createMicroFrontendTitle: {
    color: theme.darkTextColor,
  },
  closeButton: {
    cursor: "pointer",
    position: "absolute",
    top: 3,
    right: 15,
    color: theme.darkTextColor,
    fontSize: 25,
    borderRadius: 10,
  },
  button: {
    marginTop: 5,
    display: "flex",
    justifyContent: "center",
    backgroundColor: theme.primary,
    color: theme.lightTextColor,
    padding: 10,
    border: "none",
    borderRadius: 5,
    cursor: "pointer",
    fontWeight: "bold",
  },
  titleInput: {
    marginBottom: 20,
    marginTop: 10,
    backgroundColor: theme.lightTextColor,
    border: "none",
    placeholder: "title",
    borderRadius: 20,
    padding: 5,
    height: 30,
    textAlign: "center",
    color: theme.darkTextColor,
    fontSize: 26,
  },

  componentsContainer: {
    display: "flex",
    marginBottom: 10,
    flexDirection: "column",
  },
  addComponentButton: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: theme.primary,
  },
  addComponentIcon: {
    fontSize: 25,
    marginRight: 10,
  },
  singleComponentContainer: {
    border: "1px solid " + theme.lightTextColor,
    padding: 10,
    position: "relative",
  },
  deleteComponentButton: {
    position: "absolute",
    top: 0,
    right: 0,
    color: theme.errorColor,
    zIndex: 2,
    fontSize: 20,
    backgroundColor: theme.secondary,
    boxShadow: theme.boxShadow,
    cursor: "pointer",
  },
  loading: {
    margin: "auto",
    marginTop: 10,
  },
  "@media (max-width: 850px)": {
    createMicroFrontendModalContainer: {
      width: "70vw",
    },
  },
}));

export default useStyles;
