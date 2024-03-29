import { createUseStyles } from "react-jss";
import { ITheme } from "roottypes";

const useStyles = createUseStyles((theme: ITheme) => ({
  profilePageContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    backgroundColor: theme.backgroundColor,
  },
  connectedUserContainer: {
    display: "flex",
    justifyContent: "space-between",
    margin: "auto",
    width: "90%",
    alignItems: "flex-start",
    marginTop: 100,
    position: "relative",
  },
  postsAndEditor: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 20,
    flex: 1,
    overflow: "hidden",
  },
  userFullName: {
    color: theme.darkTextColor,
    fontSize: 25,
    marginLeft: 20,
  },
  userProfilePicAndName: {
    display: "flex",
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },

  profileAndPages: {
    display: "flex",
    flexDirection: "column",
    flex: 0.4,
  },
  configurationIcon: {
    position: "absolute",
    left: 5,
    top: 5,
    fontSize: 20,
    cursor: "pointer",
    color: theme.darkerPrimary,
  },
  "@media (max-width: 930px)": {
    profileAndPages: {
      width: "100%",
      flex: "initial",
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
      justifyContent: "flex-start",
    },
  },
}));

export default useStyles;
