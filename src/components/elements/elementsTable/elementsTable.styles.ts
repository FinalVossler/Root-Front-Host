import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles(
  (theme: ITheme & { resizerLeftStick?: number }) => ({
    elementsTable: {
      color: theme.darkTextColor,
      maxWidth: "100%",
      overflow: "auto",
      alignSelf: "start",
      paddingBottom: 20,
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
    stickColumn: {
      position: "sticky",
      left: theme.resizerLeftStick || 0,
      zIndex: 1,
      backgroundColor: theme.backgroundColor,
    },
    stickHeaderColumn: {
      extend: "stickColumn",
      zIndex: 2,
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
      position: "sticky",
      left: 0,
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
    columnResizer: {
      zIndex: 2,
    },
    "@media (max-width: 800px)": {},
  })
);

export default useStyles;
