import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  createEntityModalContainer: {
    display: "flex",
    flexDirection: "column",
    paddingBottom: 15,
    maxHeight: "calc(100vh - 200px)",
    position: "relative",
    overflow: "auto",
    paddingRight: 45,
    width: "60vw",
  },
  createEntityHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingBottom: 15,
    borderBottom: "1px solid " + theme.borderColor,
    marginBottom: "10px",
  },
  createEntityTitle: {
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
    backgroundColor: theme.darkTextColor,
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
  erroredFields: {
    color: theme.errorColor,
  },
  assignedUsersByRoleInputContainer: {
    display: "flex",
    flexDirection: "column",
    border: "1px solid " + theme.darkTextColor,
    padding: 10,
    paddingBottom: 0,
    marginBottom: 10,
  },
  assignedUsersByRoleContainer: {
    display: "flex",
    color: theme.darkTextColor,
    marginLeft: 20,
    marginBottom: 10,
    alignItems: "center",
    position: "relative",
  },
  assignedUsername: {
    marginLeft: 10,
  },
  deleteAssignedUserIcon: {
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
    color: theme.errorColor,
    fontSize: 20,
  },
  userAssignmentTitle: {
    color: theme.primary,
    fontSize: 20,
  },
  fieldIframe: {},
  "@media (max-width: 850px)": {
    createEntityModalContainer: {
      width: "70vw",
      paddingRight: 10,
      paddingLeft: 10,
    },
  },
}));

export default useStyles;
