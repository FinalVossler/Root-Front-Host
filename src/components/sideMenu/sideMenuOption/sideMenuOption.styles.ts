import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  sideMenuOptionContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
    borderBottom: "2px solid " + theme.lightTextColor,
    padding: 20,
    cursor: "pointer",
    transition: "all .1s ease-in-out",

    "&:hover": {
      backgroundColor: theme.secondary,
      borderColor: theme.primary,
    },

    "&:hover $optionTitle": {
      color: theme.primary,
    },

    "&:hover $optionIcon": {
      color: theme.primary,
    },
    "&:hover svg": {
      color: theme.primary,
    },
  },
  optionIcon: {
    fontSize: 30,
    color: theme.lightTextColor,
  },
  optionTitle: {
    marginLeft: 10,
    color: theme.lightTextColor,
    fontSize: 22,
  },
  triggerSubOptionsButton: {
    fontSize: 30,
    color: theme.primary,
    cursor: "pointer",
    position: "absolute",
    right: 10,
  },
  subOptionsContainer: {
    display: "flex",
    flexDirection: "column",
  },
  subOption: {
    extend: "sideMenuOptionContainer",

    color: theme.lightTextColor,
    padding: 10,
    borderBottom: "1px solid " + theme.lightTextColor,
    display: "flex",
    alignItems: "center",
  },
  subOptionIcon: {
    extend: "optionIcon",
    fontSize: 25,
    marginLeft: 40,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
