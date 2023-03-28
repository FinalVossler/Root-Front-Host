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
    zIndex: 5,
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
  "@media (max-width: 800px)": {
    headerContainer: {
      justifyContent: "flex-end",
    },
    headerTitle: {
      display: "none",
    },
    option: {
      fontSize: 15,
      margin: 5,
    },
  },
  "@media (max-width: 400px)": {
    right: {
      width: "100%",
    },
    optionsList: {
      width: "100%",
      justifyContent: "space-around",
      padding: 0,
    },
    option: {
      margin: 7,
      fontSize: 13,
    },
  },
}));

export default useStyles;
