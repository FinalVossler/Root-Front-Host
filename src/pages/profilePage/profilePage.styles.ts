import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  profilePageContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.backgroundColor,
  },
  switchFormContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    color: theme.lightTextColor,
  },
  switchFormButton: {
    color: theme.primary,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: 20,
  },
}));

export default useStyles;
