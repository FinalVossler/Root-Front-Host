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
  },
  elementsTable: {
    color: theme.darkTextColor,
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
    border: "1px solid " + theme.darkTextColor,
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
    color: theme.darkTextColor,
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
