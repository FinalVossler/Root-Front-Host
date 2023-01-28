import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginBottom: 30,
  },
  inputContainerFocused: {
    extend: "inputContainer",

    "& input": {
      borderBottom: "1px solid " + theme.primary,
    },
    "& svg": {
      color: theme.primary,
    },
  },
  input: {
    border: "none",
    padding: 13,
    paddingLeft: 37,
    fontSize: 17,
    transition: "all .2s ease-int-out",
    color: theme.lightTextColor,
    backgroundColor: theme.boxColor,
    borderRadius: 5,
  },
  inputIcon: {
    position: "absolute",
    fontSize: 25,
    color: theme.primary,
    top: 10,
    transition: "all .2s ease-int-out",
    left: 6,
  },
  inputError: {
    color: theme.errorColor,
    marginTop: 5,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
