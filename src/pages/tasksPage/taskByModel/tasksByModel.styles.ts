import { createUseStyles } from "react-jss";
import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  tasksByModelContainer: {
    display: "flex",
    flexDirection: "column",
    color: theme.darkTextColor,
    boxSizing: "border-box",
    width: "100%",
    padding: 40,
  },
  tasksByModelTable: {
    color: theme.darkTextColor,
    maxWidth: "100%",
    overflow: "auto",
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
  subColumnContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  userFirstNameAndLastName: {
    marginLeft: 10,
    position: "relative",
    top: 1,
  },
}));

export default useStyles;
