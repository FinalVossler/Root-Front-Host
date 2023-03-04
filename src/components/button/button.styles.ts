import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  buttonContainer: {
    display: "flex",
    backgroundColor: theme.primary,
    color: theme.lightTextColor,
    border: "none",
    textAlign: "center",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 15,
    paddingLeft: 15,
    borderRadius: 5,
    fontWeight: 600,
    fontSize: 20,
    cursor: "pointer",
    transition: ".2s all ease-in-out",
  },
  disabledButtonContainer: {
    extend: "buttonContainer",
    color: theme.primary,
    backgroundColor: theme.lightTextColor,
  },
  "@media (max-width: 800px)": {},
}));

export default useStyles;
