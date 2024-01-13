import { createUseStyles } from "react-jss";

import { ITheme } from "../../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  postOptionsContainer: {
    position: "relative",
    display: "flex",
    width: "100%",
    justifyContent: "flex-end",
    flexDirection: "row-reverse",
  },
  postOptionsButton: {
    fontSize: 25,
    cursor: "pointer",
    color: theme.darkTextColor,
  },
  optionsContainer: {
    boxShadow: theme.boxShadow,
    display: "flex",
    flexDirection: "column",
    width: 200,
    backgroundColor: theme.lightTextColor,
    color: theme.primary,
    border: "1px solid " + theme.primary,
    position: "absolute",
    right: 20,
    top: 20,
    padding: 10,
    borderRadius: 5,
    zIndex: 100,
  },
  option: {
    fontSize: 15,
    cursor: "pointer",
    backgroundColor: theme.lightTextColor,
    color: theme.primary,
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
