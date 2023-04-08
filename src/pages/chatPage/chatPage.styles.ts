import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatPageContainer: {
    display: "flex",
    height: "100vh",
    width: "100%",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.backgroundColor,
  },
  chatPageContent: {
    width: "90%",
    height: "80%",
    backgroundColor: theme.contentBackgroundColor,
    display: "flex",
    position: "relative",
    marginTop: 80,
    padding: 10,
    borderRadius: 20,
  },
  chatWelcome: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    flex: 1,
    justifyContent: "center",
  },
  chatRobot: {
    height: 320,
  },
  welcomeText: {
    color: theme.lightTextColor,
    fontSize: 30,
    marginBottom: 10,
    letterSpacing: 0.1,
  },
  welcomeTextUserName: {
    color: theme.primary,
  },
  chatDirectionText: {
    color: theme.lightTextColor,
    fontSize: 20,
    letterSpacing: 1,
    textAlign: "center",
  },
  chatButtons: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: "0px",
    right: 0,
  },
  chatButton: {
    margin: 20,
    color: theme.primary,
    cursor: "pointer",
    fontSize: 30,
  },
  "@media (max-width: 850px)": {
    chatWelcome: {
      display: "none",
    },
  },
}));

export default useStyles;
