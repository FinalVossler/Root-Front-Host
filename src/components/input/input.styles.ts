import { createUseStyles } from "react-jss";

import { ITheme } from "../../config/theme";

const useStyles = createUseStyles((theme: ITheme) => ({
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginBottom: 10,
    flex: 1,

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
    color: theme.darkTextColor,
    marginRight: 10,
    textAlign: "start",
    width: 170,
  },
  input: {
    border: "none",
    padding: 13,
    fontSize: 17,
    transition: "all .2s ease-int-out",
    color: theme.darkTextColor,
    backgroundColor: theme.boxColor,
    borderRadius: 5,
    boxSizing: "border-box",
    width: "100%",
    boxShadow: theme.boxShadow,

    "&::placeholder": {
      color: theme.darkTextColor,
      opacity: 0.5,
    },
    "&:focus-visible": {
      outline: "2px solid " + theme.secondary,
    },
  },
  inputWithLabel: {
    extend: "input",
    width: "calc(100% - 170px)",
  },
  inputIcon: {
    position: "absolute",
    fontSize: 25,
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
