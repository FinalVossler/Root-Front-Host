import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginBottom: 10,

    "& svg": {
      color: theme.primary,
      opacity: 0.5,
    },
  },
  inputContainerFocused: {
    extend: "inputContainer",

    "& input": {
      borderBottom: "1px solid " + theme.primary,
    },
    "& svg": {
      opacity: 1,
    },
  },
  labelAndInputContainer: {
    display: "flex",
    alignItems: "center",
    flex: 1,
  },
  labelAndInputDisabled: {
    extend: "labelAndInputContainer",

    "& input": {
      backgroundColor: theme.secondary,
    },
  },
  label: {
    color: theme.lightTextColor,
    marginRight: 10,
    textAlign: "start",
    width: 170,
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

    "&::placeholder": {
      color: theme.lightTextColor,
      opacity: 0.5,
    },
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
    left: 185,
  },
  inputError: {
    color: theme.errorColor,
    marginTop: 5,
  },
  "@media (max-width: 800px)": {
    labelAndInputContainer: {
      flexDirection: "column",
      alignItems: "flex-start",
    },
    label: {
      width: "initial",
      marginBottom: 5,
    },
    inputIconWithLabel: {
      position: "initial",
      display: "none",
    },
    inputWithLabel: {
      width: "100%",
      paddingLeft: 5,
    },
  },
}));

export default useStyles;
