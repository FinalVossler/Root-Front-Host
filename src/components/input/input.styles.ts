import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginBottom: 10,
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
  labelAndInputContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  label: {
    color: theme.lightTextColor,
    marginRight: 10,
    textAlign: "start",
    width: 200,
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
    boxSizing: "border-box",
    width: "100%",
  },
  inputWithLabel: {
    extend: "input",
    width: "calc(100% - 200px)",
  },
  inputIcon: {
    position: "absolute",
    fontSize: 25,
    color: theme.primary,
    top: 10,
    left: 6,
    cursor: "pointer",
  },
  inputIconWithLabel: {
    extend: "inputIcon",
    left: 215,
  },
  inputError: {
    color: theme.errorColor,
    marginTop: 5,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
