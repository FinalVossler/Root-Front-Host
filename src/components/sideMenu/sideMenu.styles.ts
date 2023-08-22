import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  sideMenuContainer: {
    height: "100vh",
    zIndex: 11,
    transition: "all .2s ease-in-out",
    width: 0,
    boxSizing: "border-box",
    position: "relative",
  },
  menuIcon: {
    position: "absolute",
    cursor: "pointer",
    fontSize: 40,
    right: -50,
    top: "50%",
    left: 0,
    transition: "all .2s ease-in-out",
    zIndex: 7,
  },
  websiteLogo2: {},
  menuIconMenuOpen: {
    extend: "menuIcon",
    left: "100%",
    transition: "all .2s ease-in-out",
  },
  sideMenuContent: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    position: "relative",
    height: "100vh",
    zIndex: 11,
    overflow: "auto",
  },
  openSideMenuContainer: {
    extend: "sideMenuContainer",
    borderRight: "1px solid " + theme.primary,
    width: 300,
  },
  appName: {
    color: theme.primary,
    textAlign: "center",
    fontSize: 20,
    padding: 30,
    boxSizing: "border-box",
    borderBottom: "1px solid " + theme.primary,
  },
  "@media (max-width: 800px)": {
    openSideMenuContainer: {
      width: "100%",
    },
    menuIconMenuOpen: {
      left: 10,
      top: 19,
    },
  },
}));

export default useStyles;
