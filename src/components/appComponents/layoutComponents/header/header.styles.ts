import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";
import HeaderInbox from "../../chatComponents/headerInbox/HeaderInbox";

const useStyles = createUseStyles((theme: ITheme) => ({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    boxSizing: "border-box",

    position: "fixed",
    top: "0%",
    zIndex: 11,
    height: 80,
    width: "-webkit-fill-available",

    "& .react-select__control": {
      height: 30,
      minHeight: "initial",
    },
    "& .react-select__indicator": {
      padding: 0,
    },
    "& .react-select__indicators": {
      height: "initial",
    },

    "& .react-select__value-container": {
      textAlign: "center",
      width: 35,
      paddingRight: 0,
      paddingLeft: 0,
    },

    "& .react-select__single-value": {
      top: 1.5,
      position: "relative",
      fontSize: 13,
    },
  },
  headerIcon: {
    fontSize: 26,
    top: 0,
    position: "relative",
  },
  headerContainerScrolled: {
    extend: "headerContainer",
    boxShadow: theme.boxShadow,

    height: 60,
    "& a": {
      color: theme.darkTextColor,
    },

    "& h2": {
      color: theme.darkTextColor,
    },
  },
  headerTitle: {
    color: theme.darkTextColor,
    fontWeight: 600,
    fontSize: 30,
    textDecoration: "none",
  },
  left: {
    display: "flex",
    alignItems: "center",
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
    flexDirection: "row",
    height: "100%",
  },
  optionsList: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    listStyle: "none",
    position: "relative",
    margin: 0,
  },
  optionATag: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.darkTextColor,
    margin: 0,
    position: "relative",
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: "pointer",
    paddingRight: 10,
    paddingLeft: 10,
    width: 88,
    height: "100%",
    boxSizing: "border-box",

    "&:hover": {
      boxShadow: theme.boxShadow,
    },
    "& a": {
      textDecoration: "none",
      color: theme.darkTextColor,
      padding: 10,
      borderRadius: 10,
    },
  },
  option: {
    display: "flex",
  },
  mobileOptionsList: {
    extend: "optionsList",
  },
  triggerMenuButton: {
    color: theme.darkTextColor,
    zIndex: 1,
    margin: "auto",
    display: "none",
    cursor: "pointer",
    transition: "all 2ms ease-in-out",

    "&:hover": {
      color: theme.primary,
    },
  },
  "@media (max-width: 1300px)": {
    left: {
      display: "none",
    },
  },
  "@media (max-width: 1000px)": {
    triggerMenuButton: {
      display: "flex",
    },
    mobileOptionsList: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      top: "0px",
      position: "fixed",
      width: "100%",
      margin: "0px",
      backgroundColor: theme.boxColor,
      borderTop: "1px solid " + theme.borderColor,
      marginTop: "60px",
      paddingLeft: "100px",
      height: "100%",
      alignItems: "center",

      "& >div": {
        paddingLeft: 50,
        paddingRight: 50,
        width: "100%",
        display: "flex",
        justifyContent: "center",
        height: 50,
        alignItems: "center",
        marginLeft: 10,
        marginRight: 10,
        boxSizing: "border-box",
        borderBottom: "1px solid " + theme.borderColor,

        "&:hover": {
          backgroundColor: theme.darkerPrimary,
          color: theme.lightTextColor,

          "& svg": {
            color: theme.lightTextColor,
          },
        },
      },
      "& svg": {
        margin: 0,
        padding: 0,
      },
    },
    optionsList: {
      display: "none",
    },
    headerContainer: {
      padding: 0,
      justifyContent: "flex-end",
      height: 60,
      right: "0px!important",
    },
    headerTitle: {
      display: "none",
    },
    optionATag: {
      fontSize: 15,
      margin: 0,
      height: 50,
      width: "100%",
      color: theme.darkTextColor,
      marginLeft: 10,
      marginRight: 10,
      boxSizing: "border-box",
      borderBottom: "1px solid " + theme.borderColor,

      "&:hover": {
        backgroundColor: theme.darkerPrimary,
        color: theme.lightTextColor,
      },
    },
  },
}));

export default useStyles;
