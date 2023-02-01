import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  profilePageContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.backgroundColor,
    flex: 1,
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
  connectedUserProfileContainer: {
    display: "flex",
    justifyContent: "space-around",
  },
  "@media (max-width: 850px)": {
    connectedUserProfileContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

export default useStyles;
