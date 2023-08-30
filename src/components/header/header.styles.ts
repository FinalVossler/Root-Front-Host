import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
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
    bottom: 6,
    position: "relative",
    marginBottom: 0,
  },
  option: {
    color: theme.darkTextColor,
    margin: "20px",
    position: "relative",
    textDecoration: "none",
    whiteSpace: "nowrap",

    "& a": {
      textDecoration: "none",
      color: theme.darkTextColor,
      padding: 10,
      borderRadius: 10,

      transition: "all .2s ease-in-out",

      "&:hover": {
        boxShadow: "0px 0px 100px 0px" + theme.primary,
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
  "@media (max-width: 1200px)": {
    left: {
      display: "none",
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
