import { createUseStyles } from "react-jss";

import { ITheme } from "../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  sideMenuOptionContainer: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    boxSizing: "border-box",
    padding: 20,
    cursor: "pointer",
    transition: "all .1s ease-in-out",
    color: theme.darkTextColor,

    "&:hover": {
      borderColor: theme.primary,
      color: theme.primary,
      background:
        "linear-gradient(to right, " +
        theme.contentBackgroundColor +
        ", " +
        theme.boxColor +
        ")",
      borderLeft: "10px solid " + theme.primary,
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
  selectedSideMenuOption: {
    extend: "sideMenuOptionContainer",
    borderColor: theme.primary,
    color: theme.primary,
    background:
      "linear-gradient(to right, " +
      theme.contentBackgroundColor +
      ", " +
      theme.boxColor +
      ")",
    borderLeft: "10px solid " + theme.primary,

    "& $optionTitle": {
      color: theme.primary,
    },
    "& $optionIcon": {
      color: theme.primary,
    },
    "& svg": {
      color: theme.primary,
    },
  },
  optionIcon: {
    fontSize: 30,
    color: theme.primary,
  },
  optionTitle: {
    marginLeft: 10,
    color: theme.darkTextColor,
    fontSize: 20,
  },

  subOptionTitle: {
    extend: "optionTitle",
    fontSize: 15,
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
    padding: 5,
    borderBottom: "1px solid " + theme.lightTextColor,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  selectedSubOption: {
    extend: "selectedSideMenuOption",
    justifyContent: "space-between",

    padding: 5,
  },
  subOptionIcon: {
    extend: "optionIcon",
    fontSize: 25,
    marginLeft: 40,
  },
  addButton: {
    color: theme.primary,
    right: 10,
    fontSize: 25,
  },
  subOptionLeft: {
    display: "flex",
    alignItems: "center",
  },
  subOptionRight: {
    display: "flex",
    alignItems: "center",
    padding: 10,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
