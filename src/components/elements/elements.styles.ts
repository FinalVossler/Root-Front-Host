import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  elementsContainer: {
    width: "100%",
    boxSizing: "border-box",
    padding: "0px 50px",
    display: "flex",
    flexDirection: "column",
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    display: "flex",
    borderRadius: 5,
    marginBottom: 10,
    marginTop: 20,
  },
  actionIcon: {
    fontSize: 30,
    cursor: "pointer",
    margin: 10,
    color: theme.darkTextColor,
  },
  addButton: {
    extend: "actionIcon",
  },
  deleteIcon: {
    extend: "actionIcon",
  },
  copyIcon: {
    extend: "actionIcon",
    color: theme.primary,
  },
  elementsTable: {
    color: theme.darkTextColor,
    maxWidth: "100%",
    overflow: "auto",
    alignSelf: "start",
  },
  tableHeader: {},
  tableRow: {
    maxWidth: "100%",

    "& .column_resizer_own_class": {
      borderRight: "1px solid " + theme.darkerPrimary,
    },

    "& .column_resizer_own_class:last-child": {
      border: "none",
    },
  },
  tableColumn: {
    padding: 20,
    lineHeight: 1.3,
    boxSizing: "border-box",
    textAlign: "center",
    fontSize: 16,
    maxWidth: 400,
  },
  tableHeaderColumn: {
    extend: "tableColumn",
    fontSize: 20,
    fontWeight: "bold",
    color: theme.darkerPrimary,
    whiteSpace: "nowrap",
    borderBottom: "2px solid " + theme.darkerPrimary,
    alignItems: "center",
    flexDirection: "row",
    display: "flex",
  },
  tbody: {},
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
    color: theme.darkTextColor,
    cursor: "pointer",
    fontSize: 20,
  },
  actionCheckbox: {
    extend: "checkbox",
    marginLeft: 10,
  },
  hiddenColumns: {
    display: "flex",
    flex: 1,
    overflow: "auto",
    alignItems: "center",
    paddingBottom: 15,
  },
  hiddenColumn: {
    boxShadow: theme.boxShadow,
    margin: 5,
    cursor: "pointer",
    padding: 10,
    display: "flex",
    alignItems: "center",
    whiteSpace: "nowrap",
  },
  showIcon: {
    marginLeft: 5,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
