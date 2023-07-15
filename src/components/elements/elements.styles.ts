import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  elementsContainer: {
    width: "90%",
    marginTop: 80,
  },
  buttonsContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    display: "flex",
    borderRadius: 5,
    marginBottom: 10,
  },
  viewTabsContainer: {
    display: "flex",
    width: "124%",
    backgroundColor: theme.lightTextColor,
    marginBottom: 10,
    position: "relative",
    left: "-10%",
    borderTop: "1px solid " + theme.darkTextColor,
  },
  viewTab: {
    flex: 1,
    height: 40,
    textAlign: "center",
    transition: ".1s all ease-in-out",
    cursor: "pointer",
    fontSize: 20,
    paddingTop: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderBottom: "4px solid " + theme.lightTextColor,
  },
  selectedViewTab: {
    extend: "viewTab",
    color: theme.darkerPrimary,
    borderBottom: "4px solid " + theme.darkerPrimary,
    fontWeight: "bold",
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
    overflow: "scroll",
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
    fontSize: 16,
  },
  tableHeaderColumn: {
    extend: "tableColumn",
    fontSize: 20,
    fontWeight: "bold",
    color: theme.darkerPrimary,
    whiteSpace: "nowrap",
    borderBottom: "2px solid " + theme.darkerPrimary,
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
    overflow: "scroll",
    alignItems: "center",
    paddingBottom: 15,
  },
  hideColumnButton: {
    color: theme.errorColor,
    position: "relative",
    top: 4,
    marginLeft: 10,
    cursor: "pointer",
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
