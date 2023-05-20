import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flex: 1,
    backgroundColor: theme.transparentBackground,
    paddingRight: 20,
    paddingLeft: 20,
    boxSizing: "border-box",

    position: "fixed",
    top: "0%",
    zIndex: 10,
    transition: "all .2s ease-in-out",
    height: 80,
    width: "-webkit-fill-available",
  },
  headerIcon: {
    fontSize: 26,
    top: 0,
    position: "relative",
  },
  headerContainerScrolled: {
    extend: "headerContainer",
    backgroundColor: theme.backgroundColor,

    boxShadow: "1px 2px 20px 0.1px black",

    height: 60,
    "& a": {
      color: theme.lightTextColor,
    },

    "& h2": {
      color: theme.lightTextColor,
    },
  },
  headerTitle: {
    color: theme.lightTextColor,
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
  },
  option: {
    color: theme.lightTextColor,
    margin: "20px",
    textDecoration: "none",
    whiteSpace: "nowrap",

    "& a": {
      textDecoration: "none",
      color: theme.lightTextColor,
      padding: 10,
      borderRadius: 10,

      transition: "all .2s ease-in-out",

      "&:hover": {
        boxShadow: "1px 2px 20px 10px black",
      },
    },
  },
  optionATag: {
    display: "flex",
  },
  mobileOptionsList: {
    extend: "optionsList",
  },
  triggerMenuButton: {
    color: theme.lightTextColor,
    zIndex: 1,
    margin: "auto",
    display: "none",
    cursor: "pointer",
    transition: "all 2ms ease-in-out",

    "&:hover": {
      color: theme.primary,
    },
  },
  "@media (max-width: 800px)": {
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
        border: "1px solid " + theme.lightTextColor,
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
    },
    headerTitle: {
      display: "none",
    },
    option: {
      fontSize: 15,
      margin: 0,
    },
  },
}));

export default useStyles;
