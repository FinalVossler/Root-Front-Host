import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  createFieldModalContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 15,
    maxHeight: "calc(100vh - 200px)",
    position: "relative",
    overflow: "auto",
    paddingRight: 45,
    width: "60vw",
  },
  createFieldHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingBottom: 15,
    borderBottom: "1px solid " + theme.borderColor,
    marginBottom: "10px",
  },
  createFieldTitle: {
    color: theme.lightTextColor,
  },
  closeButton: {
    cursor: "pointer",
    position: "absolute",
    top: 3,
    right: 5,
    color: theme.lightTextColor,
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
  loading: {
    margin: "auto",
    marginTop: 10,
  },
  optionsContainer: {
    display: "flex",
    marginBottom: 10,
    flexDirection: "column",
  },
  addOptionButton: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    color: theme.primary,
  },
  addOptionIcon: {
    fontSize: 25,
    marginRight: 10,
  },
  singleOptionContainer: {
    margin: 10,
    border: "1px solid " + theme.lightTextColor,
    padding: 10,
    position: "relative",
  },
  deleteOptionButton: {
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
  "@media (max-width: 850px)": {
    createFieldModalContainer: {
      width: "70vw",
    },
  },
}));

export default useStyles;