import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  profilePageContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  switchFormContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  switchFormButton: {
    color: theme.linkColor,
    border: "none",
    backgroundColor: "transparent",
    cursor: "pointer",
  },
}));

export default useStyles;
