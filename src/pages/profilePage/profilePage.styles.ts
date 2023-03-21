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
  connectedUserContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "auto",
    width: "90%",
    alignItems: "flex-start",
    position: "relative",
  },
  postsAndEditor: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
    flex: 1,
    overflow: "hidden",
  },
  profileAndPages: {
    display: "flex",
    flexDirection: "column",
    flex: 0.4,
  },
  configurationIcon: {
    position: "absolute",
    left: 0,
    fontSize: 20,
    cursor: "pointer",
  },
  "@media (max-width: 930px)": {
    profileAndPages: {
      width: "100%",
    },
    postsAndEditor: {
      alignItems: "center",
      width: "100%",
      margin: 0,
      marginTop: 20,
    },
    connectedUserContainer: {
      flexDirection: "column",
      alignItems: "center",
    },
  },
}));

export default useStyles;
