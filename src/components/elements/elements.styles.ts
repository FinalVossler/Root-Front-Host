import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  elementsContainer: {
    width: "90%",
    marginTop: 100,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    display: "flex",
    border: "1px solid " + theme.lightTextColor,
    marginBottom: 40,
  },
  actionIcon: {
    fontSize: 30,
    cursor: "pointer",
    margin: 10,
  },
  addIcon: {
    extend: "actionIcon",
  },
  deleteIcon: {
    extend: "actionIcon",
  },
  elementsTable: {
    color: theme.lightTextColor,
    maxWidth: "100%",
  },
  tableHeader: {},
  tableRow: {
    maxWidth: "100%",
  },
  tableColumn: {
    padding: 20,
    lineHeight: 1.3,
    maxWidth: 400,
    boxSizing: "border-box",
    textAlign: "center",
    border: "1px solid " + theme.lightTextColor,
  },
  actions: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  checkbox: {
    width: 20,
    height: 20,
    cursor: "pointer",
  },
  actionColumn: {
    extend: "tableColumn",
  },
  editIcon: {
    color: theme.primary,
    cursor: "pointer",
    fontSize: 20,
  },
  actionCheckbox: {
    extend: "checkbox",
    marginLeft: 10,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
