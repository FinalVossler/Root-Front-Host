import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

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
    transition: "all .2s ease-in-out",
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
  },
  optionsList: {
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    listStyle: "none",
    position: "relative",
    margin: 0,
  },
  option: {
    display: "flex",
    alignItems: "center",
    height: "100%",
    color: theme.darkTextColor,
    margin: 0,
    position: "relative",
    textDecoration: "none",
    whiteSpace: "nowrap",
    cursor: "pointer",
    paddingRight: 10,
    paddingLeft: 10,

    "&:hover": {
      boxShadow: theme.boxShadow,
    },
    "& a": {
      textDecoration: "none",
      color: theme.darkTextColor,
      padding: 10,
      borderRadius: 10,

      transition: "all .2s ease-in-out",
    },
  },
  optionATag: {
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
      backgroundColor: theme.contentBackgroundColor,
      paddingTop: "80px",
      paddingLeft: "100px",
      height: "100%",
      alignItems: "center",

      "& li, >div": {
        boxSizing: "border-box",
        border: "1px solid " + theme.darkTextColor,
        margin: 0,
        width: "90%",
        height: 70,
        display: "flex",
        alignItems: "center",
      },
      "& >div": {
        paddingLeft: 50,
        paddingRight: 50,
      },
      "& a": {
        padding: 0,
        height: "100%",
        display: "flex",
        alignItems: "center",
        width: "100%",
        paddingLeft: 50,
        paddingRight: 50,
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
    option: {
      fontSize: 15,
      margin: 0,
      color: theme.primary,
    },
  },
}));

export default useStyles;
