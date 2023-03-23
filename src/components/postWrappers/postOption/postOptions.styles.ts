import { createUseStyles } from "react-jss";

import { Theme } from "../../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  postOptionsContainer: {
    position: "absolute",
    right: 10,
    top: 10,
    zIndex: 9,
  },
  postOptionsButton: {
    fontSize: 25,
    cursor: "pointer",
  },
  optionsContainer: {
    boxShadow: theme.boxShadow,
    display: "flex",
    flexDirection: "column",
    width: 200,
    backgroundColor: theme.lightTextColor,
    position: "absolute",
    right: 0,
    padding: 10,
    borderRadius: 5,
  },
  option: {
    fontSize: 15,
    color: theme.primary,
    cursor: "pointer",
    border: "1px solid " + theme.primary,
    padding: 5,
    borderRadius: 5,
    transition: ".1s all ease-in-out",

    "&:hover": {
      backgroundColor: theme.primary,
      color: theme.lightTextColor,
      borderColor: theme.borderColor,
    },
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
