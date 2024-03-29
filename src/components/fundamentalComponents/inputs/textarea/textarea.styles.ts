import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  textereaContainer: {
    display: "flex",
    flexDirection: "column",
    position: "relative",
    marginBottom: 10,

    "& svg": {
      color: theme.primary,
      opacity: 0.5,
    },
  },
  textereaContainerFocused: {
    extend: "textereaContainer",

    "& input": {
      borderBottom: "1px solid " + theme.primary,
    },
    "& svg": {
      opacity: 1,
    },
  },
  label: {
    color: theme.darkTextColor,
    textAlign: "start",
    marginBottom: 10,
  },
  textarea: {
    borderWidth: "1px",
    padding: 13,
    paddingLeft: 13,
    fontSize: 17,
    transition: "all .2s ease-int-out",
    color: theme.darkTextColor,
    backgroundColor: theme.boxColor,
    borderRadius: 5,
    boxSizing: "border-box",
    width: "100%",
    border: "0.5px solid " + theme.primary,

    "&::placeholder": {
      color: theme.darkTextColor,
      boxSizing: "border-box",
      opacity: 0.5,
    },

    "&:focus": {
      border: "1px solid " + theme.darkerPrimary,
      outline: "none",
    },
  },
  textareaDisabled: {
    extend: "textarea",
    backgroundColor: theme.secondary,
  },
  textareaError: {
    color: theme.errorColor,
    marginTop: 5,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
