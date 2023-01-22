import { createUseStyles } from "react-jss";

import { Theme } from "../../config/theme";

const useStyles = createUseStyles((theme: Theme) => ({
  chatPageContainer: {
    display: "flex",
    height: "100vh",
    width: "100vw",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.chatBackground,
  },
  chatPageContent: {
    width: "90%",
    height: "90%",
    backgroundColor: theme.chatContentBackground,
    display: "flex",
    position: "relative",
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
    color: theme.chatImportantText,
  },
  chatDirectionText: {
    color: theme.lightTextColor,
    fontSize: 20,
    letterSpacing: 1,
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
    color: theme.chatButtonColor,
    cursor: "pointer",
    fontSize: 30,
  },
}));

export default useStyles;
