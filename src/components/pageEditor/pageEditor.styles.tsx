import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  pageEditorContainer: {
    width: "100%",
    maxWidth: 700,
    marginTop: 10,
    marginBottom: 10,
  },
  createPageButtonContainer: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  addPageText: {
    fontSize: 20,
    color: theme.primary,
    marginLeft: 10,
    fontWeight: "bold",
  },
  pageEditorPlusIcon: {
    color: theme.primary,
    fontSize: 45,
  },
  createPageModalContainer: {
    display: "flex",
    flexDirection: "column",
    maxHeight: "calc(100vh - 200px)",
    position: "relative",
    width: "100%",
    overflow: "auto",
    paddingRight: 45,
    paddingBottom: 200,
  },
  createPageHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingBottom: 15,
    borderBottom: "1px solid " + theme.borderColor,
    marginBottom: "10px",
  },
  createPageTitle: {
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
  "@media (max-width: 850px)": {},
}));

export default useStyles;
