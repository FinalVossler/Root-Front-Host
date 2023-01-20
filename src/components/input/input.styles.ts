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
    borderBottom: "1px solid " + theme.subtleColor,
    padding: 10,
    paddingLeft: 35,
    fontSize: 17,
    transition: "all .2s ease-int-out",
  },
  inputIcon: {
    position: "absolute",
    fontSize: 25,
    color: theme.subtleColor,
    top: 7,
    transition: "all .2s ease-int-out",
  },
  inputError: {
    color: theme.errorColor,
    marginTop: 5,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
