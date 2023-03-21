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
  "@media (max-width: 800px)": {},
}));

export default useStyles;
