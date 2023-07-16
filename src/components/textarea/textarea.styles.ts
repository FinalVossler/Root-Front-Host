import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
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
    borderColor: theme.darkTextColor,
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

    "&::placeholder": {
      color: theme.darkTextColor,
      opacity: 0.5,
    },
  },
  textareaError: {
    color: theme.errorColor,
    marginTop: 5,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
