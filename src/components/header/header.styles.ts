import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  headerContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
    background: "transparent",
    position: "fixed",
    top: "0%",
    zIndex: 2,
    transition: "all .2s ease-in-out",
    height: 100,
  },
  headerIcon: {
    fontSize: 26,
    top: 2,
    position: "relative",
  },
  headerContainerScrolled: {
    extend: "headerContainer",
    backgroundColor: "white",
    boxShadow: "1px 2px 20px 0.1px black",

    height: 60,
    "& a": {
      color: "black!important",
    },
  },
  headerTitle: {
    color: theme.primary,
    fontWeight: 100,
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
    color: "white",
    margin: "20px",
    textDecoration: "none",
    whiteSpace: "nowrap",

    "& a": {
      textDecoration: "none",
      color: "white",
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
